using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Postgres.Entities
{
    public class ApplicationRole : IdentityRole<Guid>
    {
        public ApplicationRole()
        {
            Id = Guid.NewGuid();
        }

        public virtual ICollection<ApplicationUserRole> UserRoles { get; set; } = null!;
    }
}
