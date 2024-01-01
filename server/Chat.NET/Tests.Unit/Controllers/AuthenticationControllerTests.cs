using Contracts;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using NSubstitute.ReturnsExtensions;
using Web.Controllers.Areas;
using Web.ViewModels.Authentication;

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
    }
}
