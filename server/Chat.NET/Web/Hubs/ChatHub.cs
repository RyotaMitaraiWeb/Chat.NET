using Common.Authentication;
using Common.Enums;
using Common.ErrorMessages;
using Common.Exceptions;
using Common.Hubs;
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
    public class ChatHub : Hub<IChatHubClient>
    {
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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

            await this.Groups.AddToGroupAsync(this.Context.ConnectionId, HubPrefixes.UserGroupPrefix(user.Id));

            await this.Clients.Group(HubPrefixes.UserGroupPrefix(user.Id)).SendSessionData(userData);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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

            await Clients.Group(HubPrefixes.UserGroupPrefix(claims.Id)).EndSession();
        }

        [Authorize(Policy = Policies.IsAdminSignalR)]
        public async Task AddRoleToUser(UpdateRoleViewModel updateRole, [FromServices] IRoleService roleService, [FromServices] IUserSessionStore userSessionStore)
        {
            var roleUpdateResult = await roleService.AddRoleByUserId(updateRole);

            if (roleUpdateResult != RoleUpdateResult.Success)
            {
                await this.NotifyCallerThatRoleUpdateFailed(updateRole, roleUpdateResult);
                return;
            }

            var user = await userSessionStore.GetUser(updateRole.UserId);
            if (user != null)
            {
                var roles = user.Roles.ToList();
                roles.Add(updateRole.Role);
                await userSessionStore.UpdateRoles(user.Id, [.. roles]);
                await Clients.Group(HubPrefixes.UserGroupPrefix(user.Id)).UpdateUser(user);
            }

            await Clients.Caller.RoleUpdateSucceeded(updateRole);

        }

        [Authorize(Policy = Policies.IsAdminSignalR)]
        public async Task RemoveRoleFromUser(UpdateRoleViewModel updateRole, [FromServices] IRoleService roleService, [FromServices] IUserSessionStore userSessionStore)
        {
            
            var roleUpdateResult = await roleService.RemoveRoleByUserId(updateRole);

            if (roleUpdateResult != RoleUpdateResult.Success)
            {
                await this.NotifyCallerThatRoleUpdateFailed(updateRole, roleUpdateResult);
                return;
            }

            var user = await userSessionStore.GetUser(updateRole.UserId);
            if (user != null)
            {
                var roles = user.Roles.ToList();
                roles.Remove(updateRole.Role);
                await userSessionStore.UpdateRoles(user.Id, [..roles]);
                await Clients.Group(HubPrefixes.UserGroupPrefix(user.Id)).UpdateUser(user);
            }

            await Clients.Caller.RoleUpdateSucceeded(updateRole);
        }

        private async Task NotifyCallerThatRoleUpdateFailed(UpdateRoleViewModel roleData, RoleUpdateResult result)
        {
            string error = RoleErrorMessages.GenerateErrorMessage(roleData.Role, result);
            await this.Clients.Caller.RoleUpdateFailed(error);
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
