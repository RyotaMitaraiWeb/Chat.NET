namespace Common.Authentication
{
    public static class Roles
    {
        private static readonly HashSet<string> AvailableRoles =
        [
            User,
            Moderator,
            ChatModerator,
            Admin,
        ];

        private static readonly HashSet<string> RolesThatCanBeGivenOrRemoved = [
            Moderator,
            ChatModerator,
        ];

        /// <summary>
        /// An administrator can give and remove non-administrator roles to/from other users.
        /// </summary>
        public const string Admin = "Administrator";

        /// <summary>
        /// A moderator can create and delete chat rooms.
        /// </summary>
        public const string Moderator = "Moderator";

        /// <summary>
        /// Chat moderators can give punishments like bans to other users in any chat room.
        /// </summary>
        public const string ChatModerator = "Chat Moderator";

        /// <summary>
        /// Can participate in chat rooms. The role given to any registered user.
        /// </summary>
        public const string User = "User";


        public static bool RoleExists(string role)
        {
            return AvailableRoles.Contains(role);
        }

        public static bool RoleCanBeGivenOrRemoved(string role)
        {
            return RolesThatCanBeGivenOrRemoved.Contains(role);
        }
    }
}
