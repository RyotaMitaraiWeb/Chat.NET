namespace Web.ViewModels.Commands
{
    public class UnbanCommandViewModel
    {
        public string UserId { get; set; } = string.Empty;
        public int ChatRoomId { get; set; }
        public string Username { get; set; } = string.Empty;
    }
}
