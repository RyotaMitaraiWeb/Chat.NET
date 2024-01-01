
using Infrastructure.Postgres.Entities;
using Microsoft.AspNetCore.Identity;
using NSubstitute;

namespace Tests.Unit
{
    public static class UserManagerMock
    {
        public static UserManager<ApplicationUser> Create()
        {
            var UserStoreMock = Substitute.For<IUserStore<ApplicationUser>>();
            var manager = Substitute.For<UserManager<ApplicationUser>>(UserStoreMock, null, null, null, null, null, null, null, null);
            return manager;
        }
    }
}
