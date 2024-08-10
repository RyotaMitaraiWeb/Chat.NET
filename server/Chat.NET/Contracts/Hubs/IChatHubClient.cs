﻿using Web.ViewModels.Authentication;
using Web.ViewModels.ChatRoom;
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

        Task MessageSent();
        Task UserJoin(UserClaimsViewModel user);
        Task UserLeave(UserClaimsViewModel user);
        Task SendInitialChatRoomState(InitialChatRoomStateViewModel state);
    }
}
