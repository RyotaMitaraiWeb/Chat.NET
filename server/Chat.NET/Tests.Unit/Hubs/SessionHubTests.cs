using Contracts;
using Contracts.Hubs;
using Infrastructure.Postgres.Entities;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using NSubstitute;
using Web.Controllers.Areas.Authentication;
using Web.ViewModels.Authentication;
using Web.ViewModels.User;
using HubCallerContext = Microsoft.AspNetCore.SignalR.HubCallerContext;

namespace Tests.Unit.Hubs
{
    public class SessionHubTests
    {
        [Test]
        public async Task SampleSignalRTest()
        {
            // Arrange
            SessionHub hub = new SessionHub();
            ISessionClient sessionClient = Substitute.For<ISessionClient>();
            IHubCallerClients<ISessionClient> clients =
                Substitute.For<IHubCallerClients<ISessionClient>>();

            var context = Substitute.For<HubCallerContext>();
            
            hub.Clients = clients;
            hub.Context = context;

            var mockUserManager = UserManagerMock.Create();
            IJwtService mockJwt = Substitute.For<IJwtService>();

            mockJwt.ExtractUserFromJWT("").Returns(new UserClaimsViewModel()
            {
                Id = "1",
                Username = "ryota1",
            });

            mockUserManager.FindByIdAsync("1").Returns(new ApplicationUser()
            {
                Id = Guid.NewGuid(),
                UserName = "ryota1",
            });

            mockUserManager.GetRolesAsync(new ApplicationUser()).ReturnsForAnyArgs(new string[] { "User " });


            await hub.StartSession(mockUserManager, mockJwt);
            await hub.Clients.Caller.ReceivedWithAnyArgs(1).SendSessionData(new UserViewModel());
        }
    }
}
