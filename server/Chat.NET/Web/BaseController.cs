using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api")]
    public class BaseController : ControllerBase
    {
    }
}
