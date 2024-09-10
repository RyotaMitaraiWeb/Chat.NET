namespace Common.ErrorMessages
{
    public static class CommandFailedErrorMessages
    {
        public static string UserDoesNotExist(string username) => $"User \"{username}\" does not exist";
        public const string ChatRoomDoesNotExist = "Chat room does not exist";

        public static class Ban
        {
            public static string UserAlreadyBanned(string username, string chatRoom) => $"User \"{username}\" is already banned from chat room \"{chatRoom}\"";
        }

        public static class Unban
        {
            public static string UserIsNotBanned(string username, string chatRoom) => $"User \"{username}\" is not banned from chat room \"{chatRoom}\"";
        }
    }
}
