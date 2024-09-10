using Common.ErrorMessages;
using Common.Util;
using Contracts;
using Web.ViewModels.ChatRoom;
using Web.ViewModels.User;

namespace Web.Validators
{
    public class CommandValidator(IUserService userService, IChatRoomService chatRoomService)
    {
        private readonly IUserService userService = userService;
        private readonly IChatRoomService chatRoomService = chatRoomService;

        public bool IsValid { get; private set; }
        public GetChatRoomViewModel? ChatRoom { get; private set; }
        public UserViewModel? User { get; private set; }

        public ErrorResponse? Error { get; private set; }

        public async Task Validate(int chatRoomId, string username)
        {
            var user = await this.userService.FindUserByUsername(username);
            if (user is null)
            {
                this.IsValid = false;
                this.Error = new ErrorResponse(CommandFailedErrorMessages.UserDoesNotExist(username));
                return;
            }

            this.User = user;

            var room = await this.chatRoomService.GetById(chatRoomId);

            if (room is null)
            {
                this.IsValid = false;
                this.Error = new ErrorResponse(CommandFailedErrorMessages.ChatRoomDoesNotExist);
                return;
            }

            this.ChatRoom = room;
            this.IsValid = true;
            this.Error = null;
        }
    }
}
