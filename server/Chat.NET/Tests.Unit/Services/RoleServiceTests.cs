using static Common.Authentication.Roles;
using Common.ErrorMessages;
using Infrastructure.Postgres.Entities;
using Microsoft.AspNetCore.Identity;
using NSubstitute;
using Web.Services.Admin;
using Web.ViewModels.Role;
using Common.Exceptions;
using Common.Authentication;
using MockQueryable.NSubstitute;
using Common.Enums;

namespace Tests.Unit.Services
{
    public class RoleServiceTests
    {
        public UserManager<ApplicationUser> UserManager { get; set; }
        public RoleService RoleService { get; set; }

        private readonly ICollection<ApplicationUserRole> Roles =
        [
            new()
            {
                Role = new ApplicationRole() { Name = Moderator }
            },
            new()
            {
                Role = new ApplicationRole() { Name = User }
            }
        ];

        [SetUp]
        public void SetUp()
        {
            this.UserManager = UserManagerMock.Create();
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
            Assert.That(result, Is.EqualTo(RoleUpdateResult.Success));
        }

        [Test]
        public async Task Test_AddRoleByUserIdThrowsIfUserDoesNotExist()
        {
            Guid id = Guid.NewGuid();
            var roleData = new UpdateRoleViewModel()
            {
                UserId = id.ToString(),
                Role = Moderator,
            };

            ApplicationUser? appUser = null;
            this.UserManager.FindByIdAsync(roleData.UserId).Returns(appUser);

            var result = await this.RoleService.AddRoleByUserId(roleData);

            Assert.That(result, Is.EqualTo(RoleUpdateResult.UserDoesNotExist));
        }

        [Test]
        [TestCase("Janitor")]
        [TestCase(User)]
        public async Task Test_AddRoleByUserIdThrowsIfRoleCannotBeGivenToUsers(string nonExistantRole)
        {
            Guid id = Guid.NewGuid();
            var roleData = new UpdateRoleViewModel()
            {
                UserId = id.ToString(),
                Role = nonExistantRole,
            };

            var result = await this.RoleService.AddRoleByUserId(roleData);

            Assert.That(result, Is.EqualTo(RoleUpdateResult.RoleNotAvailableForUpdate));
        }

        [Test]
        public async Task Test_AddRoleByUserIdThrowsIfUserAlreadyHasTheRole()
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
            var result = await this.RoleService.AddRoleByUserId(roleData);
            Assert.That(result, Is.EqualTo(RoleUpdateResult.RoleAlreadyGiven));
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
            Assert.That(result, Is.EqualTo(RoleUpdateResult.Success));
        }

        [Test]
        public async Task Test_RemoveRoleByUserIdThrowsIfUserDoesNotExist()
        {
            Guid id = Guid.NewGuid();
            var roleData = new UpdateRoleViewModel()
            {
                UserId = id.ToString(),
                Role = Moderator,
            };

            ApplicationUser? appUser = null;
            this.UserManager.FindByIdAsync(roleData.UserId).Returns(appUser);

            var result = await this.RoleService.RemoveRoleByUserId(roleData);

            Assert.That(result, Is.EqualTo(RoleUpdateResult.UserDoesNotExist));
        }

        [Test]
        [TestCase("Janitor")]
        [TestCase(User)]
        public async Task Test_RemoveRoleByUserIdThrowsIfRoleCannotBeGivenToUsers(string nonExistantRole)
        {
            Guid id = Guid.NewGuid();
            var roleData = new UpdateRoleViewModel()
            {
                UserId = id.ToString(),
                Role = nonExistantRole,
            };

            var result = await this.RoleService.RemoveRoleByUserId(roleData);
            Assert.That(result, Is.EqualTo(RoleUpdateResult.RoleNotAvailableForUpdate));
        }

        [Test]
        public async Task Test_RemoveRoleByUserIdThrowsIfUserDoesNotHaveTheRole()
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

            var result = await this.RoleService.RemoveRoleByUserId(roleData);

            Assert.That(result, Is.EqualTo(RoleUpdateResult.RoleNotGiven));
        }

        [Test]
        public async Task Test_GetUsersOfRolesReturnsAListOfUsersWhenSuccessful()
        {
            var users = new List<ApplicationUser>()
            {
                new()
                {
                    UserRoles = Roles,
                },
                new()
                {
                    UserRoles = new List<ApplicationUserRole>()
                    {
                        new()
                        {
                            Role = new ApplicationRole()
                            {
                                Name = User,
                            },
                        },
                    },
                }
            }.BuildMock();

            this.UserManager.Users.Returns(users);

            var result = await this.RoleService.GetUsersOfRoles(new List<string>() { Moderator, User });
            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public void Test_GetUsersOfRoleThrowsIfARoleIsInvalid()
        {
            var ex = Assert.ThrowsAsync<RoleDoesNotExistException>(
                async () => await this.RoleService.GetUsersOfRoles(new List<string>() { Moderator, "Janitor" }));

            Assert.That(ex, Is.TypeOf<RoleDoesNotExistException>());
        }
    }
}
