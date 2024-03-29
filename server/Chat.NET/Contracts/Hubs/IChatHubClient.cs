﻿using Web.ViewModels.User;

namespace Contracts.Hubs
{
    public interface IChatHubClient
    {
        Task SendSessionData(UserViewModel user);
        Task EndSession();
    }
}
