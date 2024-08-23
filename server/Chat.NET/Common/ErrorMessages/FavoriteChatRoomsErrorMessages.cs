using Common.Enums;
using Common.Util;

namespace Common.ErrorMessages
{
    public static class FavoriteChatRoomsErrorMessages
    {

        public static ErrorResponse GenerateErrorMessage(AddChatRoomFavoriteResult result)
        {
            string message = AddChatRoomFavoriteErrorMessages[result];
            return new ErrorResponse(message);
        }

        public static ErrorResponse GenerateErrorMessage(RemoveChatRoomFavoriteResult result)
        {
            string message = RemoveChatRoomFavoriteErrorMessages[result];
            return new ErrorResponse(message);
        }


        internal static class AddFavoriteFailed
        {
            public const string UserOrChatRoomDoesNotExist = "The user or chat room specified does not exist";
            public const string AlreadyFavorite = "This chat room is already marked as favorite";

        }

        internal static class RemoveFavoriteFailed
        {
            public const string ChatRoomDoesNotExist = "The chat room specified does not exist";
            public const string NotFavorite = "The chat room is not marked as favorite";
        }


        private static readonly IDictionary<AddChatRoomFavoriteResult, string> AddChatRoomFavoriteErrorMessages
            = new Dictionary<AddChatRoomFavoriteResult, string>()
            {
                { AddChatRoomFavoriteResult.AlreadyFavorite, AddFavoriteFailed.AlreadyFavorite },
                { AddChatRoomFavoriteResult.UserOrChatRoomDoesNotExist, AddFavoriteFailed.UserOrChatRoomDoesNotExist },
                { AddChatRoomFavoriteResult.Success, string.Empty },
            };

        private static readonly IDictionary<RemoveChatRoomFavoriteResult, string> RemoveChatRoomFavoriteErrorMessages
            = new Dictionary<RemoveChatRoomFavoriteResult, string>()
            {
                { RemoveChatRoomFavoriteResult.NotFavorite, RemoveFavoriteFailed.NotFavorite },
                { RemoveChatRoomFavoriteResult.ChatRoomDoesNotExist, RemoveFavoriteFailed.ChatRoomDoesNotExist },
                { RemoveChatRoomFavoriteResult.Success, string.Empty },
            };
    }
}
