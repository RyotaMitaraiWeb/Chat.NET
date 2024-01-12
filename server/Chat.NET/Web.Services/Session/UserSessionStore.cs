using Contracts;
using Infrastructure.Redis.Models;
using Redis.OM;
using Redis.OM.Searching;
using Web.ViewModels.Authentication;
using Web.ViewModels.User;

namespace Web.Services.Session
{
    public class UserSessionStore(RedisConnectionProvider provider) : IUserSessionStore
    {
        private readonly RedisCollection<UserSession> userSessions = (RedisCollection<UserSession>)provider.RedisCollection<UserSession>();

        public async Task<UserViewModel?> AddUser(UserViewModel user)
        {
            var session = await this.userSessions.FindByIdAsync(user.Id)
                ?? await this.CreateSession(user);

            if (session == null)
            {
                return null;
            }

            
            return user;
        }

        public async Task<UserViewModel?> GetUser(UserClaimsViewModel claims)
        {
            var session = await this.userSessions.FindByIdAsync(claims.Id);
            if (session == null)
            {
                return null;
            }

            return new UserViewModel()
            {
                Id = session.Id,
                Username = session.Username,
                Roles = session.Roles,
            };
        }

        public async Task<UserViewModel?> RemoveUser(UserClaimsViewModel claims)
        {
            var session = await this.userSessions.FindByIdAsync(claims.Id);
            if (session == null)
            {
                return null;
            }

            await this.userSessions.DeleteAsync(session);
            await this.userSessions.SaveAsync();

            return new UserViewModel()
            {
                Id = session.Id,
                Username = session.Username,
                Roles = session.Roles,
            };
        }

        public async Task<UserViewModel?> UpdateRoles(UserClaimsViewModel claims, string[] roles)
        {
            var session = await this.userSessions.FindByIdAsync(claims.Id);
            if (session == null)
            {
                return null;
            }

            var user = new UserViewModel()
            {
                Id = session.Id,
                Username = session.Username,
                Roles = roles,
            };

            session.Roles = roles;
            await this.userSessions.UpdateAsync(session);
            await this.userSessions.SaveAsync();

            return user;
        }

        private async Task<UserSession?> CreateSession(UserViewModel user)
        {
            var session = new UserSession()
            {
                Id = user.Id,
                Username = user.Username,
                Roles = user.Roles,
            };

            await this.userSessions.InsertAsync(session, new TimeSpan(48, 0, 0));
            await this.userSessions.SaveAsync();

            return session;
        }
    }
}
