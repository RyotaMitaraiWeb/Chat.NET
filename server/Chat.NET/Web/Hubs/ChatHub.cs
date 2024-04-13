using Common.Authentication;
using Common.Exceptions;
using Contracts;
using Contracts.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Web.ViewModels.Authentication;
using Web.ViewModels.Role;
using Web.ViewModels.User;

namespace Web.Hubs
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ChatHub : Hub<IChatHubClient>
    {
        public async Task StartSession(
            [FromServices] IUserService userService,
            [FromServices] IJwtService jwtService,
            [FromServices] IUserSessionStore userSessionStore)
        {
            var claims = this.ExtractClaims(jwtService);
            if (claims == null)
            {
                return;
            }

            string userId = claims.Id;
            var user = await userService.FindUserById(userId);
            if (user == null)
            {
                return;
            }

            var userData = new UserViewModel()
            {
                Id = user.Id,
                Username = user.Username,
                Roles = user.Roles,
            };

            await userSessionStore.AddUser(userData);

            await this.Groups.AddToGroupAsync(this.Context.ConnectionId, userId);

            await this.Clients.Group(userId).SendSessionData(userData);
        }

        public async Task EndSession(
            [FromServices] IJwtService jwtService,
            [FromServices] IUserSessionStore userSessionStore)
        {
            var claims = this.ExtractClaims(jwtService);
            if (claims == null)
            {
                return;
            }

            var result = await userSessionStore.RemoveUser(claims);
            if (result == null)
            {
                return;
            }

            await Clients.Group(claims.Id).EndSession();
        }

        [Authorize(Policy = Policies.IsAdminSignalR)]
        public async Task AddRoleToUser(UpdateRoleViewModel updateRole, [FromServices] IRoleService roleService, [FromServices] IUserSessionStore userSessionStore)
        {
            try
            {
                var role = await roleService.AddRoleByUserId(updateRole);
                var user = await userSessionStore.GetUser(role.UserId);
                if (user != null)
                {
                    await userSessionStore.UpdateRoles(user.Id, [..user.Roles, updateRole.Role]);
                    await Clients.Groups(user.Id).UpdateUser(user);
                }

                await Clients.Caller.RoleUpdateSucceeded(role);

            }
            catch (RoleUpdateFailedException ex)
            {
                await Clients.Caller.RoleUpdateFailed(ex.Message);
            }

        }

        [Authorize(Policy = Policies.IsAdminSignalR)]
        public async Task RemoveRoleFromUser(UpdateRoleViewModel updateRole, [FromServices] IRoleService roleService, [FromServices] IUserSessionStore userSessionStore)
        {
            try
            {
                var role = await roleService.RemoveRoleByUserId(updateRole);
                var user = await userSessionStore.GetUser(role.UserId);
                if (user != null)
                {
                    var roles = user.Roles.ToList();
                    roles.Remove(role.Role);
                    await userSessionStore.UpdateRoles(user.Id, [..roles]);
                    await Clients.Groups(user.Id).UpdateUser(user);
                }

                await Clients.Caller.RoleUpdateSucceeded(role);

            }
            catch (RoleUpdateFailedException ex)
            {
                await Clients.Caller.RoleUpdateFailed(ex.Message);
            }
        }

        private UserClaimsViewModel? ExtractClaims(IJwtService jwtService)
        {
            var context = this.Context.GetHttpContext();
            if (context == null)
            {
                return null;
            }

            var query = context.Request.Query;
            string token = query["access_token"].ToString() ?? string.Empty;

            var claims = jwtService.ExtractUserFromJWT(token);
            return claims;
        }
    }

}
