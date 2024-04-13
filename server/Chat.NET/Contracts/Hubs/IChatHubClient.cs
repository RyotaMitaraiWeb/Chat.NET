using Web.ViewModels.Role;
using Web.ViewModels.User;

namespace Contracts.Hubs
{
    public interface IChatHubClient
    {
        Task SendSessionData(UserViewModel user);
        Task EndSession();

        Task UpdateUser(UserViewModel user);

        Task RoleUpdateSucceeded(UpdateRoleViewModel role);
        Task RoleUpdateFailed(string error);
    }
}
