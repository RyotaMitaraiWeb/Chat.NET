﻿using Contracts.Hubs;
using Contracts;
using Microsoft.AspNetCore.SignalR;
using NSubstitute;
using Web.Controllers.Areas.Authentication;
using Web.Hubs;
using Common.Authentication;
using Web.ViewModels.Authentication;
using Web.ViewModels.User;

namespace Tests.Unit.Hubs
{
    public class ChatHubTests
    {
        public IJwtService JwtService { get; set; } = Substitute.For<IJwtService>();
        public IUserService UserService { get; set; } = Substitute.For<IUserService>();
        public IUserSessionStore UserSessionStore { get; set; } = Substitute.For<IUserSessionStore>();
        IHubCallerClients<IChatHubClient> Clients = Substitute.For<IHubCallerClients<IChatHubClient>>();
        public HubCallerContext HubCallerContext { get; set; } = Substitute.For<HubCallerContext>();
        public IGroupManager Groups { get; set; } = Substitute.For<IGroupManager>();
        public ChatHub Hub { get; set; }

        [SetUp]
        public void Setup()
        {
            this.Hub = new ChatHub
            {
                Clients = this.Clients,
                Context = this.HubCallerContext,
                Groups = this.Groups,
            };
        }

        [Test]
        public async Task Test_StartSessionCallsCorrectClientMethodWhenSuccessful()
        {
            var user = new UserViewModel()
            {
                Id = "1",
                Username = "test",
                Roles = [Roles.User],
            };

            var claims = new UserClaimsViewModel()
            {
                Id = user.Id,
                Username = user.Username,
            };

            this.HubCallerContext.ConnectionId.Returns("a");
            this.JwtService.ExtractUserFromJWT("").Returns(claims);
            this.UserService.FindUserById(claims.Id).Returns(user);
            this.UserSessionStore.AddUser(Arg.Is<UserViewModel>(u => u.Id == claims.Id)).Returns(user);

            await this.Hub.StartSession(this.UserService, this.JwtService, this.UserSessionStore);

            await this.UserSessionStore.Received(1).AddUser(Arg.Is<UserViewModel>(u => u.Id == user.Id));
            await this.Hub.Clients.Group(claims.Id)
                .Received()
                .SendSessionData(Arg.Is<UserViewModel>(u =>
                    u.Id == user.Id && u.Username == user.Username));
        }

        [Test]
        public async Task Test_EndSessionCallsCorrectClientMethodWhenSuccessful()
        {
            var user = new UserViewModel()
            {
                Id = "1",
                Username = "test",
                Roles = [Roles.User],
            };

            var claims = new UserClaimsViewModel()
            {
                Id = user.Id,
                Username = user.Username,
            };

            this.JwtService.ExtractUserFromJWT("").Returns(claims);
            this.UserSessionStore.RemoveUser(Arg.Is<UserClaimsViewModel>(u => u.Id == claims.Id)).Returns(user);

            await this.Hub.EndSession(this.JwtService, this.UserSessionStore);

            await this.UserSessionStore.Received(1).RemoveUser(Arg.Is<UserClaimsViewModel>(u => u.Id == user.Id));
            await this.Hub.Clients.Group(claims.Id)
                .Received()
                .EndSession();
        }
    }
}
