using Web.ViewModels.Authentication;
using Web.ViewModels.User;

namespace Contracts
{
    public interface IUserService
    {
        public Task<UserClaimsViewModel?> Register(UserRegisterViewModel user);
        public Task<UserClaimsViewModel?> Login(UserLoginViewModel user);
        public Task<UserViewModel?> FindUserByUsername(string username);
        public Task<UserViewModel?> FindUserById(string id);
    }
}
