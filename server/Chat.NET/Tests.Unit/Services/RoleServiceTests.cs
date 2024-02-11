using static Common.Authentication.Roles;
using Common.ErrorMessages;
using Infrastructure.Postgres.Entities;
using Microsoft.AspNetCore.Identity;
using NSubstitute;
using Web.Services.Admin;
using Web.ViewModels.Role;
using Common.Exceptions;
using Common.Authentication;

namespace Tests.Unit.Services
{
    public class RoleServiceTests
    {
        public UserManager<ApplicationUser> UserManager { get; set; } = UserManagerMock.Create();
        public RoleService RoleService { get; set; }

        private readonly ICollection<ApplicationUserRole> Roles = new List<ApplicationUserRole>()
        {
            new()
            {
                Role = new ApplicationRole() { Name = Moderator }
            },
            new()
            {
                Role = new ApplicationRole() { Name = User }
            }
        };

        [SetUp]
        public void SetUp()
        {
            this.RoleService = new RoleService(this.UserManager);
        }

        [Test]
        public async Task Test_AddRoleByUserIdReturnsRoleDataWhenSuccessful()
        {
            Guid id = Guid.NewGuid();
            var roleData = new UpdateRoleViewModel()
            {
                UserId = id.ToString(),
                Role = ChatModerator,
            };

            var appUser = new ApplicationUser()
            {
                Id = id,
                UserName = "Test",
                UserRoles = Roles
            };

            this.UserManager.FindByIdAsync(roleData.UserId).Returns(appUser);
            this.UserManager.AddToRoleAsync(appUser, roleData.Role).Returns(IdentityResult.Success);

            var result = await this.RoleService.AddRoleByUserId(roleData);
            Assert.That(result?.UserId, Is.EqualTo(id.ToString()));
        }

        [Test]
        public void Test_AddRoleByUserIdThrowsIfUserDoesNotExist()
        {
            Guid id = Guid.NewGuid();
            var roleData = new UpdateRoleViewModel()
            {
                UserId = id.ToString(),
                Role = Moderator,
            };

            ApplicationUser? appUser = null;
            this.UserManager.FindByIdAsync(roleData.UserId).Returns(appUser);

            var ex = Assert.ThrowsAsync<RoleUpdateFailedException>(
                async () => await this.RoleService.AddRoleByUserId(roleData));
            Assert.That(ex.Message, Is.EqualTo(RoleErrorMessages.UpdateFailed.UserDoesNotExist));
        }

        [Test]
        [TestCase("Janitor")]
        [TestCase(User)]
        public void Test_AddRoleByUserIdThrowsIfRoleCannotBeGivenToUsers(string nonExistantRole)
        {
            Guid id = Guid.NewGuid();
            var roleData = new UpdateRoleViewModel()
            {
                UserId = id.ToString(),
                Role = nonExistantRole,
            };

            var ex = Assert.ThrowsAsync<RoleUpdateFailedException>(
                async () => await this.RoleService.AddRoleByUserId(roleData));
            Assert.That(ex.Message, Is.EqualTo(RoleErrorMessages.UpdateFailed.RoleNotAvailableForUpdate(roleData.Role)));
        }

        [Test]
        public void Test_AddRoleByUserIdThrowsIfUserAlreadyHasTheRole()
        {
            Guid id = Guid.NewGuid();
            var roleData = new UpdateRoleViewModel()
            {
                UserId = id.ToString(),
                Role = Moderator,
            };

            var appUser = new ApplicationUser()
            {
                Id = id,
                UserName = "Test",
                UserRoles = Roles
            };

            this.UserManager.FindByIdAsync(roleData.UserId).Returns(appUser);
            var ex = Assert.ThrowsAsync<RoleUpdateFailedException>(
                async () => await this.RoleService.AddRoleByUserId(roleData));
            Assert.That(ex.Message, Is.EqualTo(RoleErrorMessages.UpdateFailed.UserAlreadyHasRole(roleData.Role)));
        }

        [Test]
        public async Task Test_RemoveRoleByUserIdReturnsRoleDataWhenSuccessful()
        {
            Guid id = Guid.NewGuid();
            var roleData = new UpdateRoleViewModel()
            {
                UserId = id.ToString(),
                Role = Moderator,
            };

            var appUser = new ApplicationUser()
            {
                Id = id,
                UserName = "Test",
                UserRoles = Roles
            };

            this.UserManager.FindByIdAsync(roleData.UserId).Returns(appUser);
            this.UserManager.RemoveFromRoleAsync(appUser, roleData.Role).Returns(IdentityResult.Success);

            var result = await this.RoleService.RemoveRoleByUserId(roleData);
            Assert.That(result?.UserId, Is.EqualTo(id.ToString()));
        }

        [Test]
        public void Test_RemoveRoleByUserIdThrowsIfUserDoesNotExist()
        {
            Guid id = Guid.NewGuid();
            var roleData = new UpdateRoleViewModel()
            {
                UserId = id.ToString(),
                Role = Moderator,
            };

            ApplicationUser? appUser = null;
            this.UserManager.FindByIdAsync(roleData.UserId).Returns(appUser);

            var ex = Assert.ThrowsAsync<RoleUpdateFailedException>(
                async () => await this.RoleService.RemoveRoleByUserId(roleData));
            Assert.That(ex.Message, Is.EqualTo(RoleErrorMessages.UpdateFailed.UserDoesNotExist));
        }

        [Test]
        [TestCase("Janitor")]
        [TestCase(User)]
        public void Test_RemoveRoleByUserIdThrowsIfRoleCannotBeGivenToUsers(string nonExistantRole)
        {
            Guid id = Guid.NewGuid();
            var roleData = new UpdateRoleViewModel()
            {
                UserId = id.ToString(),
                Role = nonExistantRole,
            };

            var ex = Assert.ThrowsAsync<RoleUpdateFailedException>(
                async () => await this.RoleService.RemoveRoleByUserId(roleData));
            Assert.That(ex.Message, Is.EqualTo(RoleErrorMessages.UpdateFailed.RoleNotAvailableForUpdate(roleData.Role)));
        }

        [Test]
        public void Test_RemoveRoleByUserIdThrowsIfUserDoesNotHaveTheRole()
        {
            Guid id = Guid.NewGuid();
            var roleData = new UpdateRoleViewModel()
            {
                UserId = id.ToString(),
                Role = ChatModerator,
            };

            var appUser = new ApplicationUser()
            {
                Id = id,
                UserName = "Test",
                UserRoles = Roles
            };

            this.UserManager.FindByIdAsync(roleData.UserId).Returns(appUser);
            var ex = Assert.ThrowsAsync<RoleUpdateFailedException>(
                async () => await this.RoleService.RemoveRoleByUserId(roleData));
            Assert.That(ex.Message, Is.EqualTo(RoleErrorMessages.UpdateFailed.UserDoesNotHaveRole(roleData.Role)));
        }
    }
}
