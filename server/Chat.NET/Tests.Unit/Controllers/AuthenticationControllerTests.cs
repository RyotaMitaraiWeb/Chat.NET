using Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;
using NSubstitute;
using NSubstitute.ReturnsExtensions;
using Web.Controllers.Areas;
using Web.ViewModels.Authentication;
using Web.ViewModels.User;

namespace Tests.Unit.Controllers
{
    public class AuthenticationControllerTests
    {
        public IJwtService JwtService { get; set; } = Substitute.For<IJwtService>();
        public IUserService UserService { get; set; } = Substitute.For<IUserService>();

        public AuthenticationController AuthenticationController { get; set; }

        [SetUp]
        public void Setup()
        {
            this.AuthenticationController = new AuthenticationController(this.UserService, this.JwtService);
        }

        [Test]
        public async Task Test_RegisterReturnsCreatedWhenSuccessful()
        {
            var register = new UserRegisterViewModel()
            {
                Username = "test",
                Password = "123456",
            };

            var claims = new UserClaimsViewModel()
            {
                Id = "1",
                Username = register.Username,
            };

            this.UserService.Register(register).ReturnsForAnyArgs(claims);

            this.JwtService.GenerateJWT(claims).ReturnsForAnyArgs("a");

            var result = await this.AuthenticationController.Register(register);
            Assert.That(result, Is.TypeOf<CreatedResult>());

            var res = result as CreatedResult;

            var value = res?.Value as SuccessfulAuthenticationResponse;
            Assert.Multiple(() =>
            {
                Assert.That(value?.Token, Is.EqualTo("a"));
                Assert.That(value?.User.Username, Is.EqualTo(register.Username));
            });
        }

        [Test]
        public async Task Test_RegisterReturnsBadRequestIfUserServiceRegisterReturnsNull()
        {
            var register = new UserRegisterViewModel()
            {
                Username = "test",
                Password = "123456",
            };

            this.UserService.Register(register).ReturnsNullForAnyArgs();
            var result = await this.AuthenticationController.Register(register);
            Assert.That(result, Is.TypeOf<BadRequestResult>());
        }

        [Test]
        public async Task Test_LoginReturnsCreatedWhenSuccessful()
        {
            var login = new UserLoginViewModel()
            {
                Username = "test",
                Password = "123456",
            };

            var claims = new UserClaimsViewModel()
            {
                Id = "1",
                Username = login.Username,
            };

            this.UserService.Login(login).ReturnsForAnyArgs(claims);
            this.JwtService.GenerateJWT(claims).ReturnsForAnyArgs("a");

            var result = await this.AuthenticationController.Login(login);
            Assert.That(result, Is.TypeOf<CreatedResult>());

            var res = result as CreatedResult;

            var value = res?.Value as SuccessfulAuthenticationResponse;
            Assert.Multiple(() =>
            {
                Assert.That(value?.Token, Is.EqualTo("a"));
                Assert.That(value?.User.Username, Is.EqualTo(login.Username));
            });
        }

        [Test]
        public async Task Test_LoginReturnsUnauthorizedIfUserServiceRegisterReturnsNull()
        {
            var login = new UserLoginViewModel()
            {
                Username = "test",
                Password = "123456",
            };

            this.UserService.Login(login).ReturnsNullForAnyArgs();
            var result = await this.AuthenticationController.Login(login);
            Assert.That(result, Is.TypeOf<UnauthorizedResult>());
        }

        [Test]
        public async Task Test_CheckIfUsernameExistsReturnsOkIfTheUsernameDoesExist()
        {
            string username = "test";
            var user = new UserViewModel()
            {
                Username = username,
            };

            this.UserService.FindUserByUsername(username).Returns(user);

            var result = await this.AuthenticationController.CheckIfUsernameExists(username);
            Assert.That(result, Is.TypeOf<OkResult>());
        }

        [Test]
        public async Task Test_CheckIfUsernameExistsReturnsNotFoundIfTheUsernameDoesNotExist()
        {
            string username = "test";
            this.UserService.FindUserByUsername(username).ReturnsNull();

            var result = await this.AuthenticationController.CheckIfUsernameExists(username);
            Assert.That(result, Is.TypeOf<NotFoundResult>());
        }
    }
}
