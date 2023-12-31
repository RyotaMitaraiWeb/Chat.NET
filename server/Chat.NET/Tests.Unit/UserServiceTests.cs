using Common.Authentication;
using Infrastructure.Postgres.Entities;
using Microsoft.AspNetCore.Identity;
using NSubstitute;
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

    }
}
