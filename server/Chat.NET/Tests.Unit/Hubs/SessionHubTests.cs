using Common.Authentication;
using Contracts;
using Contracts.Hubs;
using Infrastructure.Postgres.Entities;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
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
        public IJwtService JwtService { get; set; } = Substitute.For<IJwtService>();
        public IUserService UserService { get; set; } = Substitute.For<IUserService>();
        IHubCallerClients<ISessionClient> Clients = Substitute.For<IHubCallerClients<ISessionClient>>();
        HubCallerContext HubCallerContext { get; set; } = Substitute.For<HubCallerContext>();
        SessionHub Hub { get; set; }

        [SetUp]
        public void Setup()
        {
            this.Hub = new SessionHub
            {
                Clients = this.Clients,
                Context = this.HubCallerContext
            };
        }

        [Test]
        public async Task Test_StartSessionCallsCorrectClientMethodWhenSuccessful()
        {
            var user = new UserViewModel()
            {
                Id = "1",
                Username = "test",
                Roles = new string[] { Roles.User },
            };

            var claims = new UserClaimsViewModel()
            {
                Id = user.Id,
                Username = user.Username,
            };

            this.JwtService.ExtractUserFromJWT("").Returns(claims);
            this.UserService.FindUserById(claims.Id).Returns(user);

            await this.Hub.StartSession(this.UserService, this.JwtService);
            await this.Hub.Clients.Caller
                .Received()
                .SendSessionData(Arg.Is<UserViewModel>(u => 
                    u.Id == user.Id && u.Username == user.Username));
        }
    }
}
