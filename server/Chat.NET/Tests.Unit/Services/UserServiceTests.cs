using Common.Authentication;
using Infrastructure.Postgres.Entities;
using Microsoft.AspNetCore.Identity;
using NSubstitute;
using NSubstitute.ReturnsExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Services.Authentication;
using Web.ViewModels.Authentication;

namespace Tests.Unit.Services
{
    public class UserServiceTests
    {
        public UserManager<ApplicationUser> UserManager { get; set; }
        public UserService UserService { get; set; }

        [SetUp]
        public void Setup()
        {
            UserManager = UserManagerMock.Create();
            UserService = new UserService(UserManager);
        }

        [Test]
        public async Task Test_RegisterReturnsUserClaimsWhenSuccessful()
        {
            var register = new UserRegisterViewModel()
            {
                Username = "Test",
                Password = "123456",
            };

            var appUser = new ApplicationUser()
            {
                UserName = register.Username,
            };

            UserManager
                .CreateAsync(appUser, register.Password)
                .ReturnsForAnyArgs(IdentityResult.Success);

            UserManager
                .AddToRoleAsync(appUser, Roles.User)
                .Returns(IdentityResult.Success);

            var result = await UserService.Register(register);
            Assert.That(result?.Username, Is.EqualTo(register.Username));
        }

        [Test]
        public async Task Test_RegisterReturnsNullIfUnsuccessful()
        {
            var register = new UserRegisterViewModel()
            {
                Username = "Test",
                Password = "123456",
            };

            var appUser = new ApplicationUser()
            {
                UserName = register.Username,
            };

            UserManager
                .CreateAsync(appUser, register.Password)
                .ReturnsForAnyArgs(IdentityResult.Failed
                (
                    new IdentityError
                    {
                        Code = "Error",
                        Description = "Error",
                    }
                ));

            var result = await UserService.Register(register);
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task Test_LoginReturnsUserClaimsWhenSuccessful()
        {
            var login = new UserLoginViewModel()
            {
                Username = "test",
                Password = "123456",
            };

            var appUser = new ApplicationUser()
            {
                UserName = login.Username,
            };

            UserManager.FindByNameAsync(login.Username).Returns(appUser);
            UserManager.CheckPasswordAsync(appUser, login.Username).ReturnsForAnyArgs(true);


            var result = await UserService.Login(login);
            Assert.That(result?.Username, Is.EqualTo(login.Username));
        }

        [Test]
        public async Task Test_LoginReturnsNullIfTheUsernameCannotBeFound()
        {
            var login = new UserLoginViewModel()
            {
                Username = "test",
                Password = "123456",
            };

            UserManager.FindByNameAsync(login.Username).ReturnsNull();

            var result = await UserService.Login(login);
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task Test_LoginReturnsNullForIncorrectPassword()
        {
            var login = new UserLoginViewModel()
            {
                Username = "test",
                Password = "123456",
            };

            var appUser = new ApplicationUser()
            {
                UserName = login.Username,
            };

            UserManager.FindByNameAsync(login.Username).Returns(appUser);
            UserManager.CheckPasswordAsync(appUser, login.Username).ReturnsForAnyArgs(false);

            var result = await UserService.Login(login);
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task Test_FindUserByUsernameReturnsWhateverUserManagerReturns()
        {
            string username = "test";

            var appUser = new ApplicationUser()
            {
                Id = Guid.NewGuid(),
                UserName = username,
                UserRoles = new[]
                {
                    new ApplicationUserRole()
                    {
                        Role = new ApplicationRole()
                        {
                            Name = "User",
                        }
                    },
                }
            };

            UserManager.FindByNameAsync(username).Returns(appUser);
            var user = await UserService.FindUserByUsername(username);
            Assert.That(user?.Username, Is.EqualTo(username));
        }

        [Test]
        public async Task Test_FindUserByUsernameReturnsNullIfTheUsernameDoesNotExist()
        {
            string username = "test";

            this.UserManager.FindByNameAsync(username).ReturnsNull();
            var user = await UserService.FindUserByUsername(username);
            Assert.That(user, Is.Null);
        }

        [Test]
        public async Task Test_FindUserByIdReturnsTheUser()
        {
            string id = Guid.NewGuid().ToString();
            var appUser = new ApplicationUser()
            {
                Id = Guid.Parse(id),
                UserName = "test",
            };

            this.UserManager.FindByIdAsync(id).Returns(appUser);
            this.UserManager
                .GetRolesAsync(Arg.Is<ApplicationUser>(au => au.UserName == appUser.UserName))
                .Returns(new string[] { Roles.User });

            var user = await this.UserService.FindUserById(id);
            Assert.That(user?.Username, Is.EqualTo(appUser.UserName));
        }

        [Test]
        public async Task Test_FindUserByIdReturnsNullIfUserDoesNotExist()
        {
            string id = Guid.NewGuid().ToString();

            ApplicationUser? appUser = null;
            this.UserManager.FindByIdAsync(id).Returns(appUser);

            var user = await this.UserService.FindUserById(id);
            Assert.That(user, Is.Null);
        }
    }
}
