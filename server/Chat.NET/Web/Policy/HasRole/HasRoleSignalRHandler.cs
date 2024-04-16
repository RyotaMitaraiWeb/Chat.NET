using Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Web.ViewModels.User;

namespace Web.Policy.HasRole
{
    public class HasRoleSignalRHandler(IJwtService jwtService, IUserSessionStore userSessionStore)
        : AuthorizationHandler<HasRoleSignalRRequirement, HubInvocationContext>
    {
        private readonly IJwtService jwtService = jwtService;
        private readonly IUserSessionStore userSessionStore = userSessionStore;

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, HasRoleSignalRRequirement requirement, HubInvocationContext hubContext)
        {
            string bearer = hubContext.Context.GetHttpContext()?.Request.Query["access_token"].ToString()
                ?? string.Empty;

            await this.Authorize(context, requirement, bearer);
        }

        /// <summary>
        /// This method is publicly exposed for testing purposes
        /// </summary>
        /// <param name="context"></param>
        /// <param name="requirement"></param>
        /// <param name="bearer"></param>
        /// <returns></returns>
        public async Task Authorize(AuthorizationHandlerContext context, HasRoleSignalRRequirement requirement, string bearer)
        {
            var claims = this.jwtService.ExtractUserFromJWT(bearer);
            var user = (await this.userSessionStore.GetUser(claims))!;

            bool hasRole = HasRole(user.Roles, requirement.RequiredRoles);
            if (!hasRole)
            {
                context.Fail();
                return;
            }

            context.Succeed(requirement);
        }

        private static bool HasRole(string[] userRoles, string[] requiredRoles)
        {
            foreach (string role in requiredRoles)
            {
                foreach (string userRole in userRoles)
                {
                    if (role != userRole)
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
