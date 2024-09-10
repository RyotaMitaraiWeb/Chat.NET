namespace Web.ViewModels.ChatRoom
{
    public class GetChatRoomsViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string[] Tags { get; set; } = [];
    }
}
