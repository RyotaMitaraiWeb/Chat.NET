namespace Infrastructure.Postgres.Entities
{
    public class ChatRoom
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsDeleted { get; set; }

        public IEnumerable<ChatRoomMessage> Messages { get; set; } = [];
    }
}
