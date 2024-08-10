using Web.ViewModels.Authentication;
using Web.ViewModels.ChatRoom;

namespace Contracts
{
    public interface IChatRoomManager
    {
        public Task<bool> AddUserToRoom(string connectionId, UserClaimsViewModel claims, int chatRoomId);
        public Task<bool> RemoveConnectionIdFromRoom(string connectionId, UserClaimsViewModel claims, int chatRoomId);

        public Task<IEnumerable<UserOnUserListViewModel>> GetUsersOnline(int chatRoomId);
        public Task<IEnumerable<int>> GetRoomsOfUser(string userId);
    }
}
