﻿using Contracts;
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
    public class IsAuthenticatedSignalRHandler(IHttpContextAccessor http, IJwtService jwtService, IUserSessionStore sessionStore)
        : AuthorizationHandler<IsAuthenticatedSignalRRequirement, HubInvocationContext>
    {
        private readonly IHttpContextAccessor http = http;
        private readonly IJwtService jwtService = jwtService;
        private readonly IUserSessionStore sessionStore = sessionStore;

        protected override async Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            IsAuthenticatedSignalRRequirement requirement,
            HubInvocationContext hubContext)
        {
            string bearer = hubContext.Context.GetHttpContext()?.Request.Query["access_token"].ToString()
                ?? string.Empty;
            await this.Authorize(context, requirement, bearer);
        }

        /// <summary>
        /// This method is exposed publicly for testing purposes
        /// </summary>
        /// <param name="context"></param>
        /// <param name="requirement"></param>
        /// <param name="bearer"></param>
        /// <returns></returns>
        public async Task Authorize(AuthorizationHandlerContext context, IsAuthenticatedSignalRRequirement requirement,
            string bearer)
        {
            
            bool tokenIsValid = await this.jwtService.ValidateJwt(bearer);
            if (!tokenIsValid)
            {
                context.Fail();
                return;
            }

            var claims = this.jwtService.ExtractUserFromJWT(bearer);
            var user = await this.sessionStore.GetUser(claims);

            if (user == null)
            {
                context.Fail();
                return;
            }

            context.Succeed(requirement);
        }
    }
}
