
using Infrastructure.Postgres;
using Infrastructure.Postgres.Entities;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Chat.NET
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddLogging();

            var conn = new NpgsqlConnectionStringBuilder()
            {
                Host = "shrek",
                Port = 54320,
                Database = "test",
                Username = "tasa",
                Password = "admin",
            };

            var connString = conn.ToString();

            builder.Services.AddDbContext<ChatDbContext>(options =>
            {
                var conn = new NpgsqlConnectionStringBuilder()
                {
                    Host = "localhost",
                    
                    Database = "postgres",
                    Username = "postgres",
                    Password = "admin",
                };

                options.UseNpgsql(conn.ToString());
            });

            builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ChatDbContext>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
