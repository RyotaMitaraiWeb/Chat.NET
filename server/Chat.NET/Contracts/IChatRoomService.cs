using Common.Enums;
using Web.ViewModels.ChatRoom;

namespace Contracts
{
    public interface IChatRoomService
    {
        public Task<GetChatRoomViewModel?> GetById(int chatRoomId);
        public Task<IEnumerable<GetChatRoomsViewModel>> Search(string title);
        public Task<int> Create(CreateChatRoomViewModel chatRoom);
        public Task<ChatRoomUpdateResult> Update(UpdateChatRoomViewModel chatRoom, int chatRoomId);
        public Task<ChatRoomDeleteResult> Delete(int chatRoomId);

    }
}
