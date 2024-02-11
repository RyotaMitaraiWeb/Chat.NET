using Contracts;
using Infrastructure.Postgres.Entities;
using Common.Authentication;
using Common.ErrorMessages;
using Common.Exceptions;
using Microsoft.AspNetCore.Identity;
using Web.ViewModels.Role;
using StackExchange.Redis;
using System.Data;

namespace Web.Services.Admin
{
    public class RoleService(UserManager<ApplicationUser> userManager) : IRoleService
    {
        private readonly UserManager<ApplicationUser> userManager = userManager;

        public async Task<UpdateRoleViewModel> AddRoleByUserId(UpdateRoleViewModel roleData)
        {
            ThrowIfRoleIsNotValid(roleData.Role);
            string role = roleData.Role;

            ApplicationUser user = await this.userManager.FindByIdAsync(roleData.UserId)
                ?? throw new RoleUpdateFailedException(RoleErrorMessages.UpdateFailed.UserDoesNotExist);
            var userRoles = user.UserRoles.Select(ur => ur.Role.Name ?? string.Empty);

            if (UserHasRole(userRoles, roleData.Role))
            {
                throw new RoleUpdateFailedException(RoleErrorMessages.UpdateFailed.UserAlreadyHasRole(role));
            }

            var result = await this.userManager.AddToRoleAsync(user, role);
            if (result.Succeeded)
            {
                return roleData;
            }

            throw new Exception(String.Join(Environment.NewLine, result.Errors));
        }

        public Task<UpdateRoleViewModel> RemoveRoleByUserId(UpdateRoleViewModel roleData)
        {
            throw new NotImplementedException();
        }

        private static void ThrowIfRoleIsNotValid(string role)
        {
            if (!Roles.RoleCanBeGivenOrRemoved(role))
            {
                throw new RoleUpdateFailedException(RoleErrorMessages.UpdateFailed.RoleNotAvailableForUpdate(role));
            }
        }

        private static bool UserHasRole(IEnumerable<string> roles, string role)
        {
            return roles.Contains(role);
        }
    }
}
