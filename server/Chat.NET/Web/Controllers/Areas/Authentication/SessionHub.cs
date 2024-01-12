using Contracts;
using Contracts.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Web.Services.Authentication;
using Web.ViewModels.Authentication;
using Web.ViewModels.User;

namespace Web.Controllers.Areas.Authentication
{

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SessionHub : Hub<ISessionClient>
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
