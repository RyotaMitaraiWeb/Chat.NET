using Web.ViewModels.Role;

namespace Contracts
{
    public interface IRoleService
    {
        public Task<UpdateRoleViewModel> AddRoleByUserId(UpdateRoleViewModel roleData);
        public Task<UpdateRoleViewModel> RemoveRoleByUserId(UpdateRoleViewModel roleData);
    }
}
