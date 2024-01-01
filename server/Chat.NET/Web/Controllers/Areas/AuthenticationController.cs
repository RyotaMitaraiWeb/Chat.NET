using Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.ViewModels.Authentication;

namespace Web.Controllers.Areas
{

    [ApiController]
    [Route("auth")]
    public class AuthenticationController(IUserService userService, IJwtService jwtService) : BaseController
    {
        private readonly IUserService userService = userService;
        private readonly IJwtService jwtService = jwtService;

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(UserRegisterViewModel model)
        {
            var user = await this.userService.Register(model);
            if (user == null)
            {
                return BadRequest();
            }

            string? token = this.jwtService.GenerateJWT(user);
            var payload = new SuccessfulAuthenticationResponse
            {
                Token = token,
                User = user,
            };

            return Created("/profile/" + user.Username, payload);
        }
    }
}
