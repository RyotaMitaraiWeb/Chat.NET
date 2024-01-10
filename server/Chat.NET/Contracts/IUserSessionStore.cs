using Web.ViewModels.Authentication;
using Web.ViewModels.User;

namespace Contracts
{
    public interface IUserSessionStore
    {
        public Task<UserViewModel?> AddUser(UserClaimsViewModel claims, string connectionId);
        /// <summary>
        /// Removes the provided <paramref name="connectionId"/> from the user with the ID from the claims
        /// </summary>
        /// <param name="claims"></param>
        /// <param name="connectionId"></param>
        /// <returns></returns>
        public Task<UserViewModel?> RemoveUser(UserClaimsViewModel claims, string connectionId);

        /// <summary>
        /// Deletes the user's session entirely.
        /// </summary>
        /// <param name="claims"></param>
        /// <returns></returns>
        public Task<UserViewModel?> RemoveUser(UserClaimsViewModel claims);
        public Task<UserViewModel?> GetUser(UserClaimsViewModel claims);
        public Task<UserViewModel?> UpdateRoles(UserClaimsViewModel claims, string[] roles); 

    }
}
