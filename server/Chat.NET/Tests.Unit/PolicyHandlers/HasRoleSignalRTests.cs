using Common.Authentication;
using Contracts;
using Microsoft.AspNetCore.Authorization;
using NSubstitute;
using System.Security.Claims;
using Web.Policy.HasRole;
using Web.ViewModels.Authentication;
using Web.ViewModels.User;


namespace Tests.Unit.PolicyHandlers
{
    public class HasRoleSignalRTests
    {
        private readonly IJwtService jwtService = Substitute.For<IJwtService>();
        private readonly IUserSessionStore userSessionStore = Substitute.For<IUserSessionStore>();

        public HasRoleSignalRHandler HasRoleSignalRHandler { get; set; }
        [SetUp]
        public void SetUp()
        {
            this.HasRoleSignalRHandler = new HasRoleSignalRHandler(jwtService, userSessionStore);
        }

        [Test]
        public async Task Test_WorksWhenTheUserHasTheRoleAndThePolicyRequiresOnlyOneRole()
        {
            var requirement = new HasRoleSignalRRequirement(Roles.ChatModerator);
            var authorizationHandlerContextFactory = new DefaultAuthorizationHandlerContextFactory();
            var context = authorizationHandlerContextFactory.CreateContext(new[] { requirement }, new ClaimsPrincipal(), "a");
            string bearer = "valid_token";

            var user = new UserViewModel()
            {
                Id = "1",
                Username = "ryota",
                Roles = [Roles.ChatModerator],
            };

            var claims = new UserClaimsViewModel()
            {
                Id = user.Id,
                Username = user.Username,
            };

            this.jwtService.ExtractUserFromJWT(bearer).Returns(claims);
            this.userSessionStore.GetUser(claims).Returns(user);

            await this.HasRoleSignalRHandler.Authorize(context, requirement, bearer);
            Assert.That(context.HasSucceeded, Is.True);
        }

        [Test]
        public async Task Test_WorksWhenTheUserHasTheRolesAndThePolicyRequiresMultipleRoles()
        {
            var requirement = new HasRoleSignalRRequirement(Roles.ChatModerator, Roles.Moderator);
            var authorizationHandlerContextFactory = new DefaultAuthorizationHandlerContextFactory();
            var context = authorizationHandlerContextFactory.CreateContext(new[] { requirement }, new ClaimsPrincipal(), "a");
            string bearer = "valid_token";

            var user = new UserViewModel()
            {
                Id = "1",
                Username = "ryota",
                Roles = [Roles.ChatModerator, Roles.Moderator],
            };

            var claims = new UserClaimsViewModel()
            {
                Id = user.Id,
                Username = user.Username,
            };

            this.jwtService.ExtractUserFromJWT(bearer).Returns(claims);
            this.userSessionStore.GetUser(claims).Returns(user);

            await this.HasRoleSignalRHandler.Authorize(context, requirement, bearer);
            Assert.That(context.HasSucceeded, Is.True);
        }

        [Test]
        public async Task Test_WorksWhenTheUseDoesNotHaveARole()
        {
            var requirement = new HasRoleSignalRRequirement(Roles.ChatModerator, Roles.Moderator);
            var authorizationHandlerContextFactory = new DefaultAuthorizationHandlerContextFactory();
            var context = authorizationHandlerContextFactory.CreateContext(new[] { requirement }, new ClaimsPrincipal(), "a");
            string bearer = "valid_token";

            var user = new UserViewModel()
            {
                Id = "1",
                Username = "ryota",
                Roles = [Roles.User, Roles.Moderator],
            };

            var claims = new UserClaimsViewModel()
            {
                Id = user.Id,
                Username = user.Username,
            };

            this.jwtService.ExtractUserFromJWT(bearer).Returns(claims);
            this.userSessionStore.GetUser(claims).Returns(user);

            await this.HasRoleSignalRHandler.Authorize(context, requirement, bearer);
            Assert.That(context.HasSucceeded, Is.False);
        }
    }
}
