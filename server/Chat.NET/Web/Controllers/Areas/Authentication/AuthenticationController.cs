using Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.ViewModels.Authentication;

namespace Web.Controllers.Areas.Authentication
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
            var user = await userService.Register(model);
            if (user == null)
            {
                return BadRequest();
            }

            string? token = jwtService.GenerateJWT(user);
            var payload = new SuccessfulAuthenticationResponse
            {
                Token = token,
                User = user,
            };

            return Created("/profile/" + user.Username, payload);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UserLoginViewModel model)
        {
            var user = await userService.Login(model);
            if (user == null)
            {
                return Unauthorized();
            }

            string? token = jwtService.GenerateJWT(user);
            var payload = new SuccessfulAuthenticationResponse()
            {
                Token = token,
                User = user,
            };

            return Created("/profile/" + user.Username, payload);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("username-exists/{username}")]
        public async Task<IActionResult> CheckIfUsernameExists(string username)
        {
            var user = await userService.FindUserByUsername(username);
            if (user == null)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
