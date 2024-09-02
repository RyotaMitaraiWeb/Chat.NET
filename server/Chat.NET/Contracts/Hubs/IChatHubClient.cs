using Common.Util;
using Web.ViewModels.Authentication;
using Web.ViewModels.ChatRoom;
using Web.ViewModels.Commands;
using Web.ViewModels.Role;
using Web.ViewModels.User;

namespace Contracts.Hubs
{
    public interface IChatHubClient
    {
        Task SendSessionData(UserViewModel user);
        Task EndSession();

        Task UpdateUser(UserViewModel user);

        Task RoleUpdateSucceeded(UpdateRoleViewModel role);
        Task RoleUpdateFailed(string error);

        Task MessageSent(GetChatRoomMessageViewModel message);
        Task UserJoin(UserClaimsViewModel user);
        Task UserLeave(UserClaimsViewModel user);
        Task SendInitialChatRoomState(InitialChatRoomStateViewModel state);
        Task RoomDoesNotExist();
        Task Warn(ChatRoomPunishmentNotificationViewModel notification);
        Task Ban();
        Task Unban();
        Task CommandFailed(ErrorResponse error);
    }
}
