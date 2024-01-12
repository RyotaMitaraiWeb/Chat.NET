using Chat.NET;
using Infrastructure.Postgres;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Testcontainers.PostgreSql;
using Testcontainers.Redis;

namespace Tests.Integration
{
    public class IntegrationTestWebAppFactory<TProgram>
    : WebApplicationFactory<TProgram> where TProgram : class
    {
        private readonly PostgreSqlContainer postgreSqlContainer = new PostgreSqlBuilder()
            .WithCleanUp(true)
            .WithPortBinding(4000, true)
            .Build();

        private readonly RedisContainer redisContainer = new RedisBuilder()
            .WithImage("redis/redis-stack")
            .WithCleanUp(true)
            .WithPortBinding(6000, true)
            .Build();

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            this.InitializeAsync().Wait();
            builder.UseEnvironment("Test");
            
            var configurations = new Dictionary<string, string?>()
            {
                { "JWT_SECRET", "WEHMKWEHMLWEHLWKEMHLKWEMHLKWEHW" },
                { "REDIS_HOST", redisContainer.GetConnectionString() }
            };

            var c = new ConfigurationManager();
            c.AddInMemoryCollection(configurations);
            builder.UseConfiguration(c);

            
            builder.ConfigureTestServices(services =>
            {
                var descriptorType =
                    typeof(DbContextOptions<ChatDbContext>);
                var descriptor = services
                    .SingleOrDefault(s => s.ServiceType == descriptorType);

                if (descriptor is not null)
                {
                    services.Remove(descriptor);
                }

                services.AddDbContext<ChatDbContext>(options =>
                {
                    options.UseNpgsql(postgreSqlContainer.GetConnectionString());

                });

                var serviceProvider = services.BuildServiceProvider();

                using var scope = serviceProvider.CreateScope();
                var scopedServices = scope.ServiceProvider;
                var context = scopedServices.GetRequiredService<ChatDbContext>();
                this.Context = context;
                context.Database.EnsureCreated();
            });
        }

        public async Task InitializeAsync()
        {
            await postgreSqlContainer.StartAsync();
            await redisContainer.StartAsync();
        }

        public override async ValueTask DisposeAsync()
        {
            await this.Context.DisposeAsync();
            await postgreSqlContainer.DisposeAsync();
            await redisContainer.DisposeAsync();
        }

        private ChatDbContext Context { get; set; } = null!;
    }
}
