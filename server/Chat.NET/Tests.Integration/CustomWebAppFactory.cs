using Infrastructure.Postgres;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using Testcontainers.PostgreSql;

namespace Tests.Integration
{
    public class IntegrationTestWebAppFactory<TProgram>
    : WebApplicationFactory<TProgram> where TProgram : class
    {
        private readonly PostgreSqlContainer postgreSqlContainer = new PostgreSqlBuilder()
            .WithCleanUp(true)
            .WithPortBinding(5434, true)
            .Build();

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
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

                this.InitializeAsync().Wait();
                var conn = postgreSqlContainer.GetConnectionString();
                //services.AddDbContext<ChatDbContext>(options =>
                //    options.UseNpgsql(postgreSqlContainer.GetConnectionString()));

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
        }

        public async Task DisposeAsync()
        {
            await this.Context.DisposeAsync();
            await postgreSqlContainer.DisposeAsync();
        }

        private ChatDbContext Context { get; set; } = null!;
    }
}
