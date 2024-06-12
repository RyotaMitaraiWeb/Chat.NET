using Common.Enums;
using Web.ViewModels.Role;
using Web.ViewModels.User;

namespace Contracts
{
    public interface IRoleService
    {
        public Task<RoleUpdateResult> AddRoleByUserId(UpdateRoleViewModel roleData);
        public Task<RoleUpdateResult> RemoveRoleByUserId(UpdateRoleViewModel roleData);

        public Task<IEnumerable<UserViewModel>> GetUsersOfRoles(IEnumerable<string> roles);
    }
}
