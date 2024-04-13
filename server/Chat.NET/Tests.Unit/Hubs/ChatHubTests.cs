﻿using Contracts.Hubs;
using Contracts;
using Microsoft.AspNetCore.SignalR;
using NSubstitute;
using Web.Controllers.Areas.Authentication;
using Web.Hubs;
using Common.Authentication;
using Web.ViewModels.Authentication;
using Web.ViewModels.User;
using Web.ViewModels.Role;
using NSubstitute.ExceptionExtensions;
using Common.Exceptions;

namespace Tests.Unit.Hubs
{
    public class ChatHubTests
    {
        public IJwtService JwtService { get; set; } = Substitute.For<IJwtService>();
        public IUserService UserService { get; set; } = Substitute.For<IUserService>();
        public IUserSessionStore UserSessionStore { get; set; } = Substitute.For<IUserSessionStore>();
        IHubCallerClients<IChatHubClient> Clients = Substitute.For<IHubCallerClients<IChatHubClient>>();
        public IRoleService RoleService { get; set; } = Substitute.For<IRoleService>();
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

        [Test]
        public async Task Test_AddRoleToUserWorksWhenRoleIsAddedAndTheUserIsOnline()
        {
            var role = new UpdateRoleViewModel()
            {
                Role = Roles.Moderator,
                UserId = "1",
            };

            var user = new UserViewModel()
            {
                Id = role.UserId,
                Username = "a",
                Roles = [Roles.User, Roles.Moderator],
            };

            this.RoleService.AddRoleByUserId(role).Returns(role);
            this.UserSessionStore.GetUser(role.UserId).Returns(user);

            await this.Hub.AddRoleToUser(role, this.RoleService, this.UserSessionStore);

            await this.UserSessionStore.Received(1).UpdateRoles(user.Id, Arg.Any<string[]>());
            await this.Hub.Clients.Caller.Received().RoleUpdateSucceeded(Arg.Any<UpdateRoleViewModel>());
        }

        [Test]
        public async Task Test_AddRoleToUserWorksWhenRoleIsAddedAndTheUserIsOffline()
        {
            var role = new UpdateRoleViewModel()
            {
                Role = Roles.Moderator,
                UserId = "1",
            };

            UserViewModel? user = null;

            this.RoleService.AddRoleByUserId(role).Returns(role);
            this.UserSessionStore.GetUser(role.UserId).Returns(user);

            await this.Hub.AddRoleToUser(role, this.RoleService, this.UserSessionStore);

            await this.UserSessionStore
                .DidNotReceiveWithAnyArgs()
                .UpdateRoles(Arg.Any<string>(), Arg.Any<string[]>());

            await this.Hub.Clients.Group(role.UserId)
                .DidNotReceive()
                .UpdateUser(Arg.Any<UserViewModel>());

            await this.Hub.Clients.Caller.Received().RoleUpdateSucceeded(Arg.Any<UpdateRoleViewModel>());
        }

        [Test]
        public async Task Test_AddRoleToUserSendsAnErrorIfRoleUpdateFails()
        {
            var role = new UpdateRoleViewModel()
            {
                Role = "Janitor",
                UserId = "1",
            };

            var user = new UserViewModel()
            {
                Id = role.UserId,
                Username = "a",
                Roles = [Roles.User, Roles.Moderator],
            };

            this.RoleService.AddRoleByUserId(role).ThrowsAsync(new RoleUpdateFailedException("a"));

            await this.Hub.AddRoleToUser(role, this.RoleService, this.UserSessionStore);

            await this.Hub.Clients.Caller.Received().RoleUpdateFailed(Arg.Any<string>());
        }

    }
}
