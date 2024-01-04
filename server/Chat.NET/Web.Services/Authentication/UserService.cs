using Common.Authentication;
using Contracts;
using Infrastructure.Postgres.Entities;
using Microsoft.AspNetCore.Identity;
using Web.ViewModels.Authentication;
using Web.ViewModels.User;

namespace Web.Services.Authentication
{
    public class UserService(UserManager<ApplicationUser> userManager) : IUserService
    {
        private readonly UserManager<ApplicationUser> userManager = userManager;

        public async Task<UserClaimsViewModel?> Register(UserRegisterViewModel user)
        {
            var appUser = new ApplicationUser()
            {
                UserName = user.Username,
            };

            var registerResult = await userManager.CreateAsync(appUser, user.Password);
            if (registerResult == null)
            {
                return null;
            }

            if (!registerResult.Succeeded)
            {
                return null;
            }

            await this.userManager.AddToRoleAsync(appUser, Roles.User);
            return new UserClaimsViewModel()
            {
                Id = appUser.Id.ToString(),
                Username = appUser.UserName,
            };

        }

        public async Task<UserClaimsViewModel?> Login(UserLoginViewModel user)
        {
            var appUser = await this.userManager.FindByNameAsync(user.Username);
            if (appUser == null)
            {
                return null;
            }

            bool passwordIsCorrect = await this.userManager.CheckPasswordAsync(appUser, user.Password);
            if (!passwordIsCorrect)
            {
                return null;
            }

            return new UserClaimsViewModel()
            {
                Id = appUser.Id.ToString(),
                Username = user.Username,
            };
        }

        public async Task<UserViewModel?> FindUserByUsername(string username)
        {
            var user = await this.userManager.FindByNameAsync(username);
            if (user == null)
            {
                return null;
            }

            var roles = await this.userManager.GetRolesAsync(user);

            var data = new UserViewModel()
            {
                Id = user.Id.ToString(),
                Username = user.UserName,
                Roles = [..roles]
            };

            return data;
        }

        public async Task<UserViewModel?> FindUserById(string id)
        {
            var user = await this.userManager.FindByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            var roles = await this.userManager.GetRolesAsync(user);
            var data = new UserViewModel()
            {
                Id = user.Id.ToString(),
                Username = user.UserName,
                Roles = [..roles],
            };

            return data;
        }
    }
}
