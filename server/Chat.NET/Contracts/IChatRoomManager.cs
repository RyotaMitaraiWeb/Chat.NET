using Web.ViewModels.Authentication;
using Web.ViewModels.ChatRoom;

namespace Contracts
{
    public interface IChatRoomManager
    {
        public Task<bool> AddUserToRoom(string connectionId, UserClaimsViewModel claims, int chatRoomId);
        public Task<bool> RemoveUserFromRoom(string connectionId, UserClaimsViewModel claims, int chatRoomId);

        public Task<IEnumerable<UserOnUserListViewModel>> GetUsersOnline(int chatRoomId);
    }
}
