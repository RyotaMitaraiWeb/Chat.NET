using Common.Authentication;
using Contracts;
using Infrastructure.Postgres.Entities;
using Microsoft.AspNetCore.Identity;
using Web.ViewModels.Authentication;

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
    }
}
