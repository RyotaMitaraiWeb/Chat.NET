namespace Web.ViewModels.User
{
    public class UserViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string? Username { get; set; } = string.Empty;
        public string?[] Roles { get; set; } = [];
    }
}
