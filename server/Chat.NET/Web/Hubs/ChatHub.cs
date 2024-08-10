using Common.Authentication;
using Common.Enums;
using Common.ErrorMessages;
using Common.Exceptions;
using Common.Hubs;
using Contracts;
using Contracts.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Web.ViewModels.Authentication;
using Web.ViewModels.ChatRoom;
using Web.ViewModels.Role;
using Web.ViewModels.User;

namespace Web.Hubs
{
    public class ChatHub(
            IJwtService jwtService,
            IUserSessionStore userSessionStore,
            IUserService userService,
            IRoleService roleService,
            IChatRoomManager chatRoomManager
        ) : Hub<IChatHubClient>
    {
        private readonly IJwtService jwtService = jwtService;
        private readonly IUserSessionStore userSessionStore = userSessionStore;
        private readonly IUserService userService = userService;
        private readonly IRoleService roleService = roleService;
        private readonly IChatRoomManager chatRoomManager = chatRoomManager;

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task StartSession()
        {
            var claims = ExtractClaims();
            if (claims == null)
            {
                return;
            }

            string userId = claims.Id;
            var user = await userService.FindUserById(userId);
            if (user == null)
            {
                return;
            }

            var userData = new UserViewModel()
            {
                Id = user.Id,
                Username = user.Username,
                Roles = user.Roles,
            };

            await userSessionStore.AddUser(userData);

            await this.Groups.AddToGroupAsync(this.Context.ConnectionId, HubPrefixes.UserGroupPrefix(user.Id));

            await this.Clients.Group(HubPrefixes.UserGroupPrefix(user.Id)).SendSessionData(userData);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task EndSession()
        {
            var claims = ExtractClaims();
            if (claims == null)
            {
                return;
            }

            var result = await userSessionStore.RemoveUser(claims);
            if (result == null)
            {
                return;
            }

            await Clients.Group(HubPrefixes.UserGroupPrefix(claims.Id)).EndSession();
        }

        [Authorize(Policy = Policies.IsAdminSignalR)]
        public async Task AddRoleToUser(UpdateRoleViewModel updateRole)
        {
            var roleUpdateResult = await roleService.AddRoleByUserId(updateRole);

            if (roleUpdateResult != RoleUpdateResult.Success)
            {
                await this.NotifyCallerThatRoleUpdateFailed(updateRole, roleUpdateResult);
                return;
            }

            var user = await userSessionStore.GetUser(updateRole.UserId);
            if (user != null)
            {
                var roles = user.Roles.ToList();
                roles.Add(updateRole.Role);
                await userSessionStore.UpdateRoles(user.Id, [.. roles]);
                await Clients.Group(HubPrefixes.UserGroupPrefix(user.Id)).UpdateUser(user);
            }

            await Clients.Caller.RoleUpdateSucceeded(updateRole);

        }

        [Authorize(Policy = Policies.IsAdminSignalR)]
        public async Task RemoveRoleFromUser(UpdateRoleViewModel updateRole)
        {
            
            var roleUpdateResult = await roleService.RemoveRoleByUserId(updateRole);

            if (roleUpdateResult != RoleUpdateResult.Success)
            {
                await this.NotifyCallerThatRoleUpdateFailed(updateRole, roleUpdateResult);
                return;
            }

            var user = await userSessionStore.GetUser(updateRole.UserId);
            if (user != null)
            {
                var roles = user.Roles.ToList();
                roles.Remove(updateRole.Role);
                await userSessionStore.UpdateRoles(user.Id, [..roles]);
                await Clients.Group(HubPrefixes.UserGroupPrefix(user.Id)).UpdateUser(user);
            }

            await Clients.Caller.RoleUpdateSucceeded(updateRole);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task JoinChatRoom(JoinChatRoomViewModel roomToJoin)
        {
            var claims = ExtractClaims()!;

            await Groups.AddToGroupAsync(Context.ConnectionId, HubPrefixes.ChatRoomGroupPrefix(roomToJoin.Id));
            bool userIsNew = await chatRoomManager.AddUserToRoom(Context.ConnectionId, claims, roomToJoin.Id);

            if (userIsNew)
            {
                await Clients.Groups(HubPrefixes.ChatRoomGroupPrefix(roomToJoin.Id)).UserJoin(claims);
            }

            var users = await chatRoomManager.GetUsersOnline(roomToJoin.Id);

            var initialState = new InitialChatRoomStateViewModel()
            {
                Users = users,
            };

            await Clients.Caller.SendInitialChatRoomState(initialState);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task LeaveChatRoom(JoinChatRoomViewModel roomToLeave)
        {
            var claims = ExtractClaims()!;

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, HubPrefixes.ChatRoomGroupPrefix(roomToLeave.Id));
            bool userIsCompletelyGone = await chatRoomManager.RemoveUserFromRoom(Context.ConnectionId, claims, roomToLeave.Id);

            if (userIsCompletelyGone)
            {
                await Clients.Groups(HubPrefixes.ChatRoomGroupPrefix(roomToLeave.Id)).UserLeave(claims);
            }
        }

        public async override Task OnDisconnectedAsync(Exception? exception)
        {
            await RemoveConnectionIdFromAllRooms();

            await base.OnDisconnectedAsync(exception);
        }

        private async Task RemoveConnectionIdFromAllRooms()
        {
            var claims = ExtractClaims();
            if (claims is null)
            {
                return;
            }

            IEnumerable<int> roomsWhereUserHasCurrentlyJoined = await this.chatRoomManager.GetRoomsOfUser(claims.Id);

            foreach (int roomId in roomsWhereUserHasCurrentlyJoined)
            {
                var roomToLeave = new JoinChatRoomViewModel() { Id = roomId };
                await this.LeaveChatRoom(roomToLeave);
            }
        }

        private async Task NotifyCallerThatRoleUpdateFailed(UpdateRoleViewModel roleData, RoleUpdateResult result)
        {
            string error = RoleErrorMessages.GenerateErrorMessage(roleData.Role, result);
            await this.Clients.Caller.RoleUpdateFailed(error);
        }

        private UserClaimsViewModel? ExtractClaims()
        {
            var context = this.Context.GetHttpContext();
            if (context == null)
            {
                return null;
            }

            var query = context.Request.Query;
            string token = query["access_token"].ToString() ?? string.Empty;

            var claims = jwtService.ExtractUserFromJWT(token);
            return claims;
        }
    }

}
