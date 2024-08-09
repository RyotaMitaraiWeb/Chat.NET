using Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Web.Policy.IsAuthenticated
{
    /// <summary>
    /// Checks whether the user has a valid session in the context of SignalR.
    /// </summary>
    /// <param name="http"></param>
    /// <param name="jwtService"></param>
    /// <param name="sessionStore"></param>
    public class IsAuthenticatedHandler(IJwtService jwtService, IUserSessionStore sessionStore, IHttpContextAccessor http)
        : AuthorizationHandler<IsAuthenticatedRequirement>
    {
        private readonly IHttpContextAccessor http = http;
        private readonly IJwtService jwtService = jwtService;
        private readonly IUserSessionStore sessionStore = sessionStore;

        protected override async Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            IsAuthenticatedRequirement requirement)
        {
            string bearer = this.http.HttpContext?.Request.Headers.Authorization.FirstOrDefault()
                ?? string.Empty;
            await Console.Out.WriteLineAsync(bearer);
            await Console.Out.WriteLineAsync("HELLO");
            await this.Authorize(context, requirement, bearer);
        }

        /// <summary>
        /// This method is exposed publicly for testing purposes
        /// </summary>
        /// <param name="context"></param>
        /// <param name="requirement"></param>
        /// <param name="bearer"></param>
        /// <returns></returns>
        public async Task Authorize(AuthorizationHandlerContext context, IsAuthenticatedRequirement requirement,
            string bearer)
        {
            bool tokenIsValid = await this.jwtService.ValidateJwt(bearer);
            if (!tokenIsValid)
            {
                await Console.Out.WriteLineAsync("Token is invalid");
                context.Fail();
                return;
            }

            var claims = this.jwtService.ExtractUserFromJWT(bearer);
            var user = await this.sessionStore.GetUser(claims);

            if (user == null)
            {
                await Console.Out.WriteLineAsync("User is null");

                if (claims is null)
                {
                    await Console.Out.WriteLineAsync("And so are claims");
                }
            context.Fail();
                return;
            }

            await Console.Out.WriteLineAsync("authenticated");
            context.Succeed(requirement);
        }
    }
}
