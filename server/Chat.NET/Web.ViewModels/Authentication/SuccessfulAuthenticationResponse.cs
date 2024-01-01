namespace Web.ViewModels.Authentication
{
    public class SuccessfulAuthenticationResponse
    {
        public string Token { get; set; } = string.Empty;
        public UserClaimsViewModel User { get; set; } = null!;
    }
}
