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

namespace Tests.Unit
{
    public class UserServiceTests
    {
        public UserManager<ApplicationUser> UserManager { get; set; }
        public UserService UserService { get; set; }

        [SetUp]
        public void Setup()
        {
            this.UserManager = UserManagerMock.Create();
            this.UserService = new UserService(this.UserManager);
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

            this.UserManager
                .CreateAsync(appUser, register.Password)
                .ReturnsForAnyArgs(IdentityResult.Success);

            this.UserManager
                .AddToRoleAsync(appUser, Roles.User)
                .Returns(IdentityResult.Success);

            var result = await this.UserService.Register(register);
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

            this.UserManager
                .CreateAsync(appUser, register.Password)
                .ReturnsForAnyArgs(IdentityResult.Failed
                (
                    new IdentityError
                    {
                        Code = "Error",
                        Description = "Error",
                    }
                ));

            var result = await this.UserService.Register(register);
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

            this.UserManager.FindByNameAsync(login.Username).Returns(appUser);
            this.UserManager.CheckPasswordAsync(appUser, login.Username).ReturnsForAnyArgs(true);


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

            this.UserManager.FindByNameAsync(login.Username).ReturnsNull();

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

            this.UserManager.FindByNameAsync(login.Username).Returns(appUser);
            this.UserManager.CheckPasswordAsync(appUser, login.Username).ReturnsForAnyArgs(false);

            var result = await UserService.Login(login);
            Assert.That(result, Is.Null);
        }

    }
}
