namespace Common.ErrorMessages
{
    public static class RoleErrorMessages
    {
        public static class UpdateFailed
        {
            public const string UserDoesNotExist = "This user does not exist";
            public static string RoleNotAvailableForUpdate(string role) => $"Role \"{role}\" cannot be given to or removed from users";
            public static string UserAlreadyHasRole(string role) => $"This user already has role \"{role}\"";
            public static string UserDoesNotHaveRole(string role) => $"This user does not have role \"{role}\"";
        }

        public static string RoleDoesNotExist(string role) => $"Role \"{role}\" does not exist!";
    }
}
