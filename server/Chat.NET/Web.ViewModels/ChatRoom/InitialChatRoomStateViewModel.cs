namespace Web.ViewModels.ChatRoom
{
    public class InitialChatRoomStateViewModel
    {
        public IEnumerable<UserOnUserListViewModel> Users { get; set; } = Enumerable.Empty<UserOnUserListViewModel>();
        public IEnumerable<GetChatRoomMessageViewModel> Messages { get; set; } = Enumerable.Empty<GetChatRoomMessageViewModel>();
    }
}
