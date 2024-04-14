using Common.Authentication;
using Contracts;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Web.Controllers.Areas.Admin;
using Web.ViewModels.User;

namespace Tests.Unit.Controllers
{
    public class RolesControllerTests
    {
        public IRoleService RoleService { get; set; } = Substitute.For<IRoleService>();
        public RolesController RolesController { get; set; }

        [SetUp]
        public void SetUp()
        {
            this.RolesController = new RolesController(this.RoleService);
        }

        [Test]
        public async Task Test_GetUsersOfRolesCorrectlyReturnsUsers()
        {
            string[] rolesInput = [Roles.Moderator, Roles.User];
            var users = new List<UserViewModel>()
            {
                new() { Id = "1" }
            };

            this.RoleService.GetUsersOfRoles(rolesInput).Returns(users);

            var result = await this.RolesController.GetUsersOfRoles(rolesInput);
            var response = result as OkObjectResult;
            var body = response?.Value as List<UserViewModel>;
            Assert.That(body, Is.EqualTo(users));
        }
    }
}
