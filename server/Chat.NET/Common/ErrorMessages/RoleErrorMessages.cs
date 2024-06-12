using Common.Enums;

namespace Common.ErrorMessages
{
    public static class RoleErrorMessages
    {
        internal static class UpdateFailed
        {
            public const string UserDoesNotExist = "This user does not exist";
            public const string GeneralFail = "Could not update the user's roles, please try again later!";
            public static string RoleNotAvailableForUpdate(string role) => $"Role \"{role}\" cannot be given to or removed from users";
            public static string UserAlreadyHasRole(string role) => $"This user already has role \"{role}\"";
            public static string UserDoesNotHaveRole(string role) => $"This user does not have role \"{role}\"";
        }

        private static readonly Dictionary<RoleUpdateResult, string> StaticErrors = new()
        {
            { RoleUpdateResult.Success, string.Empty },
            { RoleUpdateResult.GeneralFail, UpdateFailed.GeneralFail },
            { RoleUpdateResult.UserDoesNotExist, UpdateFailed.UserDoesNotExist },
        };

        private static readonly Dictionary<RoleUpdateResult, Func<string, string>> DynamicErrors = new()
        {
            { RoleUpdateResult.RoleNotAvailableForUpdate, UpdateFailed.RoleNotAvailableForUpdate },
            { RoleUpdateResult.RoleAlreadyGiven, UpdateFailed.UserAlreadyHasRole },
            { RoleUpdateResult.RoleNotGiven, UpdateFailed.UserDoesNotHaveRole },
        };

        public static string GenerateErrorMessage(string role, RoleUpdateResult result)
        {
            if (StaticErrors.TryGetValue(result, out string? value))
            {
                return value;
            }

            var fn = DynamicErrors[result];
            return fn(role);
        }

        public static string RoleDoesNotExist(string role) => $"Role \"{role}\" does not exist!";
    }
}
