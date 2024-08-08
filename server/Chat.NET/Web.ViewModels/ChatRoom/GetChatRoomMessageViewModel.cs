namespace Web.ViewModels.ChatRoom
{
    public class GetChatRoomMessageViewModel
    {
        public int ChatRoomId { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public ChatRoomMessageSenderViewModel Sender { get; set; } = null!;
    }
}
