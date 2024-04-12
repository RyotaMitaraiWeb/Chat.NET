using Web.ViewModels.Authentication;
using Web.ViewModels.User;

namespace Contracts
{
    public interface IUserSessionStore
    {
        public Task<UserViewModel?> AddUser(UserViewModel claims);
        public Task<UserViewModel?> RemoveUser(UserClaimsViewModel claims);
        public Task<UserViewModel?> GetUser(UserClaimsViewModel claims);
        public Task<UserViewModel?> GetUser(string userId);
        public Task<UserViewModel?> UpdateRoles(UserClaimsViewModel claims, string[] roles); 

    }
}
