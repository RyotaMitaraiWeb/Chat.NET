using Common.ErrorMessages;
using System.ComponentModel.DataAnnotations;
using Web.ViewModels.ValidationAttributes;

namespace Web.ViewModels.ChatRoom
{
    public class UpdateChatRoomViewModel
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        [UniqueTags]
        [MaxLength(Common.Rules.ChatRoom.Tags.MaxLength, ErrorMessage = ChatRoomErrorMessages.Tags.MaxLength)]
        public string[] Tags { get; set; } = [];
    }
}
