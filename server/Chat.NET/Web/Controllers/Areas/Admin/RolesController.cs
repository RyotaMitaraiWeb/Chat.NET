using Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Areas.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController(IRoleService roleService) : BaseController
    {
        private readonly IRoleService roleService = roleService;
        [Route("roles")]
        public async Task<ActionResult> GetUsersOfRoles([FromQuery] string[] roles)
        {
            var users = await this.roleService.GetUsersOfRoles(roles);
            return Ok(users);
        }
    }
}
