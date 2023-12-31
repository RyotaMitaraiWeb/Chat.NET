using Web.ViewModels.Authentication;

namespace Contracts
{
    public interface IUserService
    {
        public Task<UserClaimsViewModel?> Register(UserRegisterViewModel user);
    }
}
