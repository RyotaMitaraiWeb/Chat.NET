using Web.ViewModels.User;

namespace Contracts.Hubs
{
    public interface ISessionClient
    {
        Task SendSessionData(UserViewModel user);
        Task EndSession();
    }
}
