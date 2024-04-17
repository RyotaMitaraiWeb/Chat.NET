using Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Policy.IsAuthenticated;
using System.Security.Claims;
using Microsoft.Extensions.Primitives;
using Web.ViewModels.Authentication;
using Web.ViewModels.User;
using Common.Authentication;

namespace Tests.Unit.PolicyHandlers
{
    public class IsAuthenticatedTests
    {
        private readonly IHttpContextAccessor httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        private readonly IJwtService jwtService = Substitute.For<IJwtService>();
        private readonly IUserSessionStore userSessionStore = Substitute.For<IUserSessionStore>();
        public IsAuthenticatedHandler IsAuthenticatedHandler { get; set; }

        [SetUp]
        public void Setup()
        {
            this.IsAuthenticatedHandler = new IsAuthenticatedHandler(this.httpContextAccessor, this.jwtService, this.userSessionStore);
        }

        [Test]
        public async Task Test_WorksWhenAValidTokenIsFound()
        {
            var requirement = new IsAuthenticatedRequirement();
            string bearer = "valid_token";

            var claims = new UserClaimsViewModel()
            {
                Id = "1",
                Username = "ryota",
            };

            var user = new UserViewModel()
            {
                Id = claims.Id,
                Username = claims.Username,
                Roles = [Roles.User]
            };

            var authorizationHandlerContextFactory = new DefaultAuthorizationHandlerContextFactory();
            var context = authorizationHandlerContextFactory.CreateContext(new[] { requirement }, new ClaimsPrincipal(), "a");

            this.jwtService.ValidateJwt(bearer).Returns(true);
            this.jwtService.ExtractUserFromJWT(bearer).Returns(claims);
            this.userSessionStore.GetUser(claims).Returns(user);

            await this.IsAuthenticatedHandler.Authorize(context, requirement, bearer);

            Assert.That(context.HasSucceeded, Is.True);
        }

        [Test]
        public async Task Test_WorksWhenTheTokenIsInvalid()
        {
            var requirement = new IsAuthenticatedRequirement();
            string bearer = "invalid_token";

            var authorizationHandlerContextFactory = new DefaultAuthorizationHandlerContextFactory();
            var context = authorizationHandlerContextFactory.CreateContext(new[] { requirement }, new ClaimsPrincipal(), "a");

            this.jwtService.ValidateJwt(bearer).Returns(false);
            
            await this.IsAuthenticatedHandler.Authorize(context, requirement, bearer);

            Assert.That(context.HasSucceeded, Is.False);
        }

        [Test]
        public async Task Test_WorksWhenTheUserDoesNotHaveAnActiveSession()
        {
            var requirement = new IsAuthenticatedRequirement();
            string bearer = "invalid_token";
            var claims = new UserClaimsViewModel()
            {
                Id = "1",
                Username = "ryota",
            };

            UserViewModel? user = null;

            var authorizationHandlerContextFactory = new DefaultAuthorizationHandlerContextFactory();
            var context = authorizationHandlerContextFactory.CreateContext(new[] { requirement }, new ClaimsPrincipal(), "a");

            this.jwtService.ValidateJwt(bearer).Returns(true);
            this.jwtService.ExtractUserFromJWT(bearer).Returns(claims);
            this.userSessionStore.GetUser(claims).Returns(user);

            await this.IsAuthenticatedHandler.Authorize(context, requirement, bearer);

            Assert.That(context.HasSucceeded, Is.False);
        }


    }
}
