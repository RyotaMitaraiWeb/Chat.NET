using Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Web.Policy.HasRole
{
    public class HasRoleHandler(IJwtService jwtService, IUserSessionStore userSessionStore, IHttpContextAccessor http)
        : AuthorizationHandler<HasRoleRequirement>
    {
        private readonly IJwtService jwtService = jwtService;
        private readonly IUserSessionStore userSessionStore = userSessionStore;
        private readonly IHttpContextAccessor http = http;

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, HasRoleRequirement requirement)
        {
            string bearer = http.HttpContext?.Request.Headers.Authorization.First()
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
        public async Task Authorize(AuthorizationHandlerContext context, HasRoleRequirement requirement, string bearer)
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
                if (!userRoles.Contains(role))
                {
                    return false;
                }
            }

            return true;
        }
    }
}
