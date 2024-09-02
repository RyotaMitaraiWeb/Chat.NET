using Common.Authentication;
using Common.Enums;
using Common.ErrorMessages;
using Common.Hubs;
using Common.Util;
using Contracts;
using Contracts.Hubs;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Web.ViewModels.Authentication;
using Web.ViewModels.ChatRoom;
using Web.ViewModels.Commands;
using Web.ViewModels.Role;
using Web.ViewModels.User;

namespace Web.Hubs
{
    public class ChatHub(
            IJwtService jwtService,
            IUserSessionStore userSessionStore,
            IUserService userService,
            IRoleService roleService,
            IChatRoomManager chatRoomManager,
            IChatRoomMessageService chatRoomMessageService,
            IValidator<SendChatRoomMessageViewModel> messageValidator,
            ICommandService commandService,
            IChatRoomService chatRoomService
        ) : Hub<IChatHubClient>
    {
        private readonly IJwtService jwtService = jwtService;
        private readonly IUserSessionStore userSessionStore = userSessionStore;
        private readonly IUserService userService = userService;
        private readonly IRoleService roleService = roleService;
        private readonly IChatRoomManager chatRoomManager = chatRoomManager;
        private readonly IChatRoomMessageService chatRoomMessageService = chatRoomMessageService;
        private readonly IValidator<SendChatRoomMessageViewModel> messageValidator = messageValidator;
        private readonly ICommandService commandService = commandService;
        private readonly IChatRoomService chatRoomService = chatRoomService;

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

            var roomsWhereUserHasJoined = await this.chatRoomManager.GetRoomsOfUser(claims.Id);

            foreach (int roomId in roomsWhereUserHasJoined)
            {
                await this.chatRoomManager.RemoveUserFromRoom(claims, roomId);
                await Clients.Group(HubPrefixes.ChatRoomGroupPrefix(roomId)).UserLeave(claims);
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
            string connectionId = Context.ConnectionId;
            await Groups.AddToGroupAsync(Context.ConnectionId, HubPrefixes.ChatRoomGroupPrefix(roomToJoin.Id));
            bool userIsNew = await chatRoomManager.AddUserToRoom(connectionId, claims, roomToJoin.Id);

            if (userIsNew)
            {
                await Clients
                    .GroupExcept(HubPrefixes.ChatRoomGroupPrefix(roomToJoin.Id), connectionId)
                    .UserJoin(claims);
            }

            var users = await chatRoomManager.GetUsersOnline(roomToJoin.Id);
            var messages = await chatRoomMessageService.GetRecentMessages(roomToJoin.Id);

            var initialState = new InitialChatRoomStateViewModel()
            {
                Users = users,
                Messages = messages,
                
            };

            await Clients.Caller.SendInitialChatRoomState(initialState);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task SendMessage(SendChatRoomMessageViewModel messageToSend)
        {
            var claims = ExtractClaims();
            if (claims is null)
            {
                return;
            }

            var validation = await this.messageValidator.ValidateAsync(messageToSend);
            if (!validation.IsValid)
            {
                return;
            }

            var message = await this.chatRoomMessageService.CreateMessage(messageToSend, claims, DateTime.UtcNow);

            if (message is null)
            {
                await Clients.Caller.RoomDoesNotExist();
                return;
            }

            await Clients.Group(HubPrefixes.ChatRoomGroupPrefix(messageToSend.ChatRoomId)).MessageSent(message);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task LeaveChatRoom(JoinChatRoomViewModel roomToLeave)
        {
            var claims = ExtractClaims()!;

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, HubPrefixes.ChatRoomGroupPrefix(roomToLeave.Id));
            bool userIsCompletelyGone = await chatRoomManager.RemoveConnectionIdFromRoom(Context.ConnectionId, claims, roomToLeave.Id);

            if (userIsCompletelyGone)
            {
                await Clients.Groups(HubPrefixes.ChatRoomGroupPrefix(roomToLeave.Id)).UserLeave(claims);
            }
        }

        [Authorize(Policy = Policies.IsChatModeratorSignalR)]
        public async Task WarnUser(WarnCommandViewModel command)
        {
            var user = await this.userService.FindUserByUsername(command.Username);
            if (user is null)
            {
                var response = new ErrorResponse("User does not exist");
                await this.Clients.Caller.CommandFailed(response);
                return;
            }

            GetChatRoomViewModel? room = await this.chatRoomService.GetById(command.ChatRoomId);
            if (room is null)
            {
                var response = new ErrorResponse("Room does not exist");
                await this.Clients.Caller.CommandFailed(response);
                return;
            }

            command.UserId = user.Id;

            await this.commandService.Warn(command);

            ChatRoomPunishmentNotificationViewModel notification = new()
            {
                ChatRoomId = command.ChatRoomId,
                ChatRoomName = room.Title,
                Message = command.Reason,
            };

            await Clients.Groups(HubPrefixes.UserGroupPrefix(user.Id)).Warn(notification);
        }

        [Authorize(Policy = Policies.IsChatModeratorSignalR)]
        public async Task BanUser(BanCommandViewModel command)
        {
            var user = await this.userService.FindUserByUsername(command.Username);
            if (user is null)
            {
                var response = new ErrorResponse("User does not exist");
                await this.Clients.Caller.CommandFailed(response);
                return;
            }

            bool roomExists = await this.chatRoomService.CheckIfRoomExists(command.ChatRoomId);
            if (!roomExists)
            {
                var response = new ErrorResponse("Room does not exist");
                await this.Clients.Caller.CommandFailed(response);
                return;
            }

            command.UserId = user.Id;

            BanCommandResult result = await this.commandService.Ban(command);
            if (result == BanCommandResult.AlreadyBanned)
            {
                var response = new ErrorResponse("User is already banned");
                await this.Clients.Caller.CommandFailed(response);
                return;
            }

            IEnumerable<string> connectionIds = await this.chatRoomManager
                .BanUser(command.ChatRoomId, user.Id);

            var bannedUserClaims = new UserClaimsViewModel()
            {
                Id = user.Id,
                Username = user.Username,
            };

            foreach (var connectionId in connectionIds)
            {
                await Groups
                    .RemoveFromGroupAsync(connectionId, HubPrefixes.ChatRoomGroupPrefix(command.ChatRoomId));
            }

            await Clients.Groups(HubPrefixes.UserGroupPrefix(user.Id)).Ban();

            await Clients
                .Groups(HubPrefixes.ChatRoomGroupPrefix(command.ChatRoomId))
                .UserLeave(bannedUserClaims);
        }

        [Authorize(Policy = Policies.IsChatModeratorSignalR)]
        public async Task UnbanUser(UnbanCommandViewModel command)
        {
            var user = await this.userService.FindUserByUsername(command.Username);
            if (user is null)
            {
                var response = new ErrorResponse("User does not exist");
                await this.Clients.Caller.CommandFailed(response);
                return;
            }

            command.UserId = user.Id;
            UnbanCommandResult result = await this.commandService.Unban(command);

            if (result == UnbanCommandResult.NotBanned)
            {
                var response = new ErrorResponse("User not banned from specified room");
                await this.Clients.Caller.CommandFailed(response);
                return;
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
