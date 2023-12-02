using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Postgres.Entities
{
    /// <summary>
    /// Mapping table for users and roles.
    /// </summary>
    public class ApplicationUserRole : IdentityUserRole<Guid>
    {
        public virtual ApplicationUser User { get; set; } = null!;
        public virtual ApplicationRole Role { get; set; } = null!;
    }
}
