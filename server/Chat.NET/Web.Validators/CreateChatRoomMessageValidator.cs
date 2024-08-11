using FluentValidation;
using Web.ViewModels.ChatRoom;
using Common.Rules;
namespace Web.Validators
{
    public class CreateChatRoomMessageValidator : AbstractValidator<SendChatRoomMessageViewModel>
    {
        public CreateChatRoomMessageValidator()
        {
            RuleFor(message => message.Message).NotEmpty().MaximumLength(ChatRoom.Message.MaxLength);
        }
    }
}
