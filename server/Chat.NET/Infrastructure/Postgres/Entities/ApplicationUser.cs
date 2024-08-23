using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Postgres.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public ApplicationUser()
        {
            this.Id = Guid.NewGuid();
        }

        public virtual ICollection<ApplicationUserRole> UserRoles { get; set; } = null!;
        public ICollection<UserFavoriteChatRoom> FavoriteChatRooms { get; set; } = [];
    }
}
