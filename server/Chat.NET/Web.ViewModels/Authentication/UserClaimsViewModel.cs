namespace Web.ViewModels.Authentication
{
    /// <summary>
    /// Represents data for the user decoded from their JWT.
    /// </summary>
    public class UserClaimsViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public HashSet<string> Roles { get; set; } = [];
    }
}
