using System.ComponentModel.DataAnnotations.Schema;


namespace Infrastructure.Postgres.Entities
{
    public class ChatRoomMessage
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public ApplicationUser Sender { get; set; } = null!;

        [ForeignKey(nameof(Sender))]
        public Guid SenderId { get; set; }

        public ChatRoom ChatRoom { get; set; } = null!;

        [ForeignKey(nameof(ChatRoom))]
        public int ChatRoomId { get; set; }
    }
}
