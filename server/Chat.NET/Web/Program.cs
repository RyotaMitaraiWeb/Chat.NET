
using Infrastructure.Postgres;
using Infrastructure.Postgres.Entities;
using Infrastructure.Postgres.Repository;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Chat.NET
{
    public partial class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddLogging();

            var conn = new NpgsqlConnectionStringBuilder()
            {
                Host = builder.Configuration["POSTGRES_HOST"],
                Database = builder.Configuration["POSTGRES_DB"],
                Username = builder.Configuration["POSTGRES_USER"],
                Password = builder.Configuration["POSTGRES_PASSWORD"],
            };

            string connString = conn.ConnectionString;

            builder.Services.AddDbContext<ChatDbContext>(options =>
            {
                

                options.UseNpgsql(connString);
            });

            builder.Services.AddScoped<IRepository, Repository>();

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
