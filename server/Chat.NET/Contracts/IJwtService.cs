using Web.ViewModels.Authentication;

namespace Contracts
{
    public interface IJwtService
    {
        public string GenerateJWT(UserClaimsViewModel user);
        public UserClaimsViewModel ExtractUserFromJWT(string jwt);
        public Task<bool> ValidateJwt(string jwt);
    }
}
