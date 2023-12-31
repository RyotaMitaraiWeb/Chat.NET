﻿using Contracts;
using Contracts.Hubs;
using Infrastructure.Postgres.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Web.ViewModels.User;

namespace Web.Controllers.Areas.Authentication
{

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SessionHub : Hub<ISessionClient>
    {
        public async Task StartSession(
            [FromServices] IUserService userService,
            [FromServices] IJwtService jwtService)
        {
            var context = this.Context.GetHttpContext();
            if (context  == null)
            {
                return;
            }

            var query = context.Request.Query;
            string? token = query["access_token"];
            token ??= string.Empty;
            var claims = jwtService.ExtractUserFromJWT(token);

            string userId = claims.Id;
            var user = await userService.FindUserById(userId);
            if (user == null)
            {
                return;
            }

            var userData = new UserViewModel()
            {
                Id = user.Id,
                Username = user.Username,
                Roles = user.Roles,
            };

            await this.Clients.Caller.SendSessionData(userData);
        }

        public async Task EndSession(string jwt)
        {
            await Clients.Caller.EndSession();
        }
    }
}
