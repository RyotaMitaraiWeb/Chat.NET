
using Contracts;
using Infrastructure.Postgres;
using Infrastructure.Postgres.Entities;
using Infrastructure.Postgres.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using System.Text;
using Web.Services.Authentication;

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
            builder.Services.AddSingleton<IJwtService, JwtService>();

            builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ChatDbContext>();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                string? secret = builder.Configuration["JWT_SECRET"];
                secret ??= string.Empty;

                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = builder.Configuration["JWT_VALID_ISSUER"],
                    ValidAudience = builder.Configuration["JWT_VALID_AUDIENCE"],
                    IssuerSigningKey = new SymmetricSecurityKey
                    (Encoding.UTF8.GetBytes(secret)),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                };
            });

            builder.Services.AddAuthorization();

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

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
