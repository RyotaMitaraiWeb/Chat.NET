namespace Web.ViewModels.Role
{
    /// <summary>
    /// Can be used for both adding and removing roles.
    /// </summary>
    public class UpdateRoleViewModel
    {
        public string Role { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
    }
}
