using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Postgres.Entities
{
    public class UserFavoriteChatRoom
    {
        public int Id { get; set; }
        public ApplicationUser User { get; set; } = null!;
        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }
        public ChatRoom ChatRoom { get; set; } = null!;
        [ForeignKey(nameof(ChatRoom))]
        public int ChatRoomId { get; set; }
    }
}
