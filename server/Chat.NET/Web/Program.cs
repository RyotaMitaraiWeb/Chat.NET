
using Contracts;
using Infrastructure.Postgres;
using Infrastructure.Postgres.Entities;
using Infrastructure.Postgres.Repository;
using Infrastructure.Redis.CreationServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Npgsql;
using Redis.OM;
using StackExchange.Redis;
using System.Text;
using Web.Controllers.Areas.Authentication;
using Web.Services.Authentication;
using Web.Services.Session;

namespace Chat.NET
{
    public partial class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddSignalR();
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

            ConfigurationOptions options = new()
            {
                EndPoints = { builder.Configuration["REDIS_HOST"] },
                ConnectTimeout = 15000,
                SyncTimeout = 15000,
                AbortOnConnectFail = false,
            };

            builder.Services.AddSingleton(new RedisConnectionProvider(options));
            builder.Services.AddHostedService<UserSessionCreationService>();
            builder.Services.AddSingleton<IUserSessionStore, UserSessionStore>();
            builder.Services.AddScoped<IRepository, Repository>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddSingleton<IJwtService, JwtService>();

            builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
            })
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

                o.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) &&
                            (path.StartsWithSegments("/session-hub")))
                        {
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });

            builder.Services.AddSwaggerGen(options =>
            {
                options.ResolveConflictingActions(api => api.First());
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "Quiz World", Version = "v1" });
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            builder.Services.AddAuthorization();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.MapHub<SessionHub>("/session-hub");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors(options =>
            {
                string? origin = builder.Configuration["ALLOWED_ORIGINS"];
                origin ??= "localhost";
                options.WithOrigins(origin);
                options.WithMethods("GET", "POST", "PUT", "DELETE", "PATCH");
                options.AllowAnyHeader();
                options.AllowCredentials();
            });


            app.MapControllers();

            app.Run();
        }
    }
}
