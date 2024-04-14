using Contracts;
using Infrastructure.Postgres.Entities;
using Common.Authentication;
using Common.ErrorMessages;
using Common.Exceptions;
using Microsoft.AspNetCore.Identity;
using Web.ViewModels.Role;
using System.Data;
using Web.ViewModels.User;
using Microsoft.EntityFrameworkCore;

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

        public async Task<UpdateRoleViewModel> RemoveRoleByUserId(UpdateRoleViewModel roleData)
        {
            ThrowIfRoleIsNotValid(roleData.Role);
            string role = roleData.Role;

            ApplicationUser user = await this.userManager.FindByIdAsync(roleData.UserId)
                ?? throw new RoleUpdateFailedException(RoleErrorMessages.UpdateFailed.UserDoesNotExist);
            var userRoles = user.UserRoles.Select(ur => ur.Role.Name ?? string.Empty);

            if (!UserHasRole(userRoles, roleData.Role))
            {
                throw new RoleUpdateFailedException(RoleErrorMessages.UpdateFailed.UserDoesNotHaveRole(role));
            }

            var result = await this.userManager.RemoveFromRoleAsync(user, role);
            if (result.Succeeded)
            {
                return roleData;
            }

            throw new Exception(String.Join(Environment.NewLine, result.Errors));
        }

        public async Task<IEnumerable<UserViewModel>> GetUsersOfRoles(IEnumerable<string> roles)
        {
            foreach (string role in roles)
            {
                ThrowIfRoleDoesNotExist(role);
            }

            var users = await this.userManager
                .Users
                .Where(u => roles.All(role => u.UserRoles.Select(ur => ur.Role.Name).Contains(role)))
                .Select(u => new UserViewModel()
                {
                    Id = u.Id.ToString(),
                    Username = u.UserName!,
                    Roles = u.UserRoles.Select(ur => ur.Role.Name).ToArray()!,
                })
                .ToListAsync();

            return users;
                
        }

        private static void ThrowIfRoleIsNotValid(string role)
        {
            if (!Roles.RoleCanBeGivenOrRemoved(role))
            {
                throw new RoleUpdateFailedException(RoleErrorMessages.UpdateFailed.RoleNotAvailableForUpdate(role));
            }
        }

        private static void ThrowIfRoleDoesNotExist(string role)
        {
            if (!Roles.RoleExists(role))
            {
                throw new RoleDoesNotExistException(RoleErrorMessages.RoleDoesNotExist(role));
            }
        }

        private static bool UserHasRole(IEnumerable<string> roles, string role)
        {
            return roles.Contains(role);
        }
    }
}
