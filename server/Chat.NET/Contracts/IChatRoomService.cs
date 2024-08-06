using Common.Enums;
using Web.ViewModels.ChatRoom;

namespace Contracts
{
    public interface IChatRoomService
    {
        public GetChatRoomMessageViewModel GetById(int chatRoomId);
        public int Create(CreateChatRoomViewModel chatRoom);
        public ChatRoomUpdateResult Update(UpdateChatRoomViewModel chatRoom);
        public ChatRoomDeleteResult Delete(int chatRoomId);

    }
}
