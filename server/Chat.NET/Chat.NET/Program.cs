
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

            builder.Services.AddDbContext<ChatDbContext>(options =>
            {
                var conn = new NpgsqlConnectionStringBuilder()
                {
                    Host = builder.Configuration["POSTGRES_HOST"],
                    Database = builder.Configuration["POSTGRES_DB"],
                    Username = builder.Configuration["POSTGRES_USER"],
                    Password = builder.Configuration["POSTGRES_PASSWORD"],
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
