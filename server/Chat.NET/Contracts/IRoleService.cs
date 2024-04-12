using Web.ViewModels.Role;
using Web.ViewModels.User;

namespace Contracts
{
    public interface IRoleService
    {
        public Task<UpdateRoleViewModel> AddRoleByUserId(UpdateRoleViewModel roleData);
        public Task<UpdateRoleViewModel> RemoveRoleByUserId(UpdateRoleViewModel roleData);

        public Task<IEnumerable<UserViewModel>> GetUsersOfRoles(IEnumerable<string> roles);
    }
}
