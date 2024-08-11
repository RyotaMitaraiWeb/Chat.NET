using Web.ViewModels.Authentication;
using Web.ViewModels.ChatRoom;

namespace Contracts
{
    public interface IChatRoomMessageService
    {
        public Task<IEnumerable<GetChatRoomMessageViewModel>> GetRecentMessages(int chatRoomId);
        public Task<GetChatRoomMessageViewModel?> CreateMessage(SendChatRoomMessageViewModel chatRoomMessageViewModel, UserClaimsViewModel claims, DateTime today);
    }
}
