using Web.ViewModels.Authentication;

namespace Contracts
{
    public interface IJwtService
    {
        public string GenerateJWT(UserClaimsViewModel user);
        public UserClaimsViewModel ExtractUserFromJWT(string jwt);
        public bool ValidateJwt(string jwt);
    }
}
