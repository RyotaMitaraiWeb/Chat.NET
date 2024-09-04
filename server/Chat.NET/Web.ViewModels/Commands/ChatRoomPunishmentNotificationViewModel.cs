namespace Web.ViewModels.Commands
{
    public class ChatRoomPunishmentNotificationViewModel
    {
        public int ChatRoomId { get; set; }
        public string ChatRoomName { get; set; } = string.Empty;
        public string? Message { get; set; }

    }
}
