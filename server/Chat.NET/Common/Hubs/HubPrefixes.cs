namespace Common.Hubs
{
    public static class HubPrefixes
    {
        private const string UserId = "userid";
        private const string ChatRoomId = "chatRoomId";

        public static string UserGroupPrefix(string userId)
        {
            return $"{UserId}-{userId}";
        }

        public static string ChatRoomGroupPrefix(string chatRoomId)
        {
            return $"{ChatRoomId}-{chatRoomId}";
        }
    }
}
