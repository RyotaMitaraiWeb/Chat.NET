namespace Common.Exceptions
{
    [Obsolete("Use RoleUpdateResult enum for control flow")]
    public class RoleUpdateFailedException(string message) : Exception(message)
    {
    }
}
