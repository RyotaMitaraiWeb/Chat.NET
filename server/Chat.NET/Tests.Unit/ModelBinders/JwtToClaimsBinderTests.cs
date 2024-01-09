using Contracts;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Primitives;
using NSubstitute;
using Web.ModelBinders;
using Web.ViewModels.Authentication;

namespace Tests.Unit.ModelBinders
{
    public class JwtToClaimsBinderTests
    {
        public IJwtService JwtService { get; set; }
        public JwtToClaimsBinder Binder { get; set; }
        public ModelBindingContext BindingContext { get; set; }

        [SetUp]
        public void SetUp()
        {
            this.JwtService = Substitute.For<IJwtService>();
            this.BindingContext = Substitute.For<ModelBindingContext>();
            this.Binder = new JwtToClaimsBinder(this.JwtService);
        }

        [Test]
        public async Task Test_BinderAttachesSuccessResultWhenJwtIsParsedCorrectly()
        {
            this.BindingContext.HttpContext.Request.Headers.Authorization.Returns((StringValues)(new string[] { "a" }));

            var claims = new UserClaimsViewModel()
            {
                Id = "1",
                Username = "Test",
            };

            this.JwtService.ExtractUserFromJWT("a").Returns(claims);
            await this.Binder.BindModelAsync(this.BindingContext);
            Assert.That(this.BindingContext.Result, Is.EqualTo(ModelBindingResult.Success(claims)));
        }

        [Test]
        public async Task Test_BinderAttachesSuccessResultWithNullIfItCannotValidateTheJWT()
        {
            this.BindingContext.HttpContext.Request.Headers.Authorization.Returns((StringValues)(new string[] { string.Empty }));

            
            this.JwtService.ExtractUserFromJWT(string.Empty).Returns(x => throw new Exception());
            await this.Binder.BindModelAsync(this.BindingContext);
            Assert.That(this.BindingContext.Result, Is.EqualTo(ModelBindingResult.Success(null)));
        }
    }
}
