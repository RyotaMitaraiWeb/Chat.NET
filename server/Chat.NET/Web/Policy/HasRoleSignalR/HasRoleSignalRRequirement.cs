using Microsoft.AspNetCore.Authorization;

namespace Web.Policy.HasRole
{
    public class HasRoleSignalRRequirement(params string[] roles) : IAuthorizationRequirement
    {
        public string[] RequiredRoles { get; set; } = roles;
    }
}
