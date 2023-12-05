using Amazon.Runtime.Internal.Util;
using Infrastructure.Postgres;
using Infrastructure.Postgres.Entities;
using Infrastructure.Postgres.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NSubstitute;

namespace Tests.Integration
{
    /// <summary>
    /// Configuration class for in-memory database tests.
    /// </summary>
    public class InMemoryDB
    {
        public string UniqueDbName = null!;

        /// <summary>
        /// Allows access the database's Identity tables.
        /// </summary>
        public UserManager<ApplicationUser> UserManager = null!;

        /// <summary>
        /// Pass this to your service so that it can access the database.
        /// </summary>
        public Repository Repository = null!;

        /// <summary>
        /// Creates the database and seeds it with some data. Each database name is
        /// guaranteed to be random, preventing race conditions.
        /// </summary>
        ///
        public InMemoryDB()
        {
            this.UniqueDbName = "chatnet" + DateTime.Now.Ticks.ToString();
            this.Seed();
        }

        public ChatDbContext CreateDbContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<ChatDbContext>();
            optionsBuilder.UseInMemoryDatabase(this.UniqueDbName);

            return new ChatDbContext(optionsBuilder.Options);
        }

        private void Seed()
        {
            var hasher = new PasswordHasher<ApplicationUser>();
            var dbContext = this.CreateDbContext();
            var userStore = new UserStore<ApplicationUser, ApplicationRole, ChatDbContext, Guid, IdentityUserClaim<Guid>,
            ApplicationUserRole, IdentityUserLogin<Guid>,
            IdentityUserToken<Guid>, IdentityRoleClaim<Guid>>(dbContext);
            var normalizer = new UpperInvariantLookupNormalizer();

            var passwordValidator = new CustomPasswordValidator();

            var logger = Substitute.For<ILogger<UserManager<ApplicationUser>>>();
            this.UserManager = new UserManager<ApplicationUser>(
                userStore, null, hasher, null,
                new IPasswordValidator<ApplicationUser>[] { passwordValidator },
                normalizer, null, null, logger);

            this.Repository = new Repository(dbContext);
        }

        public ApplicationUser User { get; private set; } = null!;
    }

    /// <summary>
    /// Passed to the User Manager when instantiating it in the test database.
    /// This is for test purposes only.
    /// </summary>
    internal class CustomPasswordValidator : IPasswordValidator<ApplicationUser>
    {
        public Task<IdentityResult> ValidateAsync(UserManager<ApplicationUser> manager, ApplicationUser user, string? password)
        {
            if (password?.Length < 6)
            {
                return Task.FromResult(IdentityResult.Failed(new IdentityError()
                {
                    Code = "Password",
                    Description = "Password must have at least six characters"
                }));
            }

            return Task.FromResult(IdentityResult.Success);
        }
    }
}
