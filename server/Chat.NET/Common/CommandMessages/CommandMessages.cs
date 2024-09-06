namespace Common.CommandMessages
{
    public static class CommandMessages
    {
        public static class Ban
        {
            public static string Title(string chatRoomName) => $"You have been banned from chat room \"{chatRoomName}\"";
            public const string Details = "You are unable to join the room anymore";
        }

        public static class Unban
        {
            public static string Title(string chatRoomName) => $"You have been unbanned from chat room \"{chatRoomName}\"";
            public const string Details = "If the ban was done in error, we apologize for that! " +
                "If this is the result of an appeal, please behave in the future so that you don't get banned again!";
        }

        public static class Warn
        {
            public static string Title(string chatRoomName) => $"You have been warned for inappropriate conduct in chat room \"{chatRoomName}\"";
            public const string Details = "Please note that continuing to misbehave will result in harsher punishments!";
        }
    }
}
