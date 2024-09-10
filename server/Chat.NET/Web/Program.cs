
using Common.Authentication;
using Common.Hubs;
using Contracts;
using FluentValidation;
using Infrastructure.Extensions;
using Infrastructure.Mongo;
using Infrastructure.Postgres;
using Infrastructure.Postgres.Entities;
using Infrastructure.Postgres.Repository;
using Infrastructure.Redis.CreationServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using Npgsql;
using Redis.OM;
using StackExchange.Redis;
using System.Text;
using Web.Hubs;
using Web.Policy.HasRole;
using Web.Policy.IsAuthenticated;
using Web.Services.Admin;
using Web.Services.Authentication;
using Web.Services.Chat;
using Web.Services.Session;
using Web.Validators;
using Web.ViewModels.ChatRoom;

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
            builder.Services.AddHostedService<ChatRoomsCreationService>();
            builder.Services.AddSingleton<IUserSessionStore, UserSessionStore>();
            builder.Services.AddScoped<IRepository, Repository>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IRoleService, RoleService>();
            builder.Services.AddSingleton<IJwtService, JwtService>();
            builder.Services.AddScoped<IAuthorizationHandler, IsAuthenticatedSignalRHandler>();
            builder.Services.AddScoped<IAuthorizationHandler, IsAuthenticatedHandler>();
            builder.Services.AddScoped<IAuthorizationHandler, HasRoleHandler>();
            builder.Services.AddScoped<IAuthorizationHandler, HasRoleSignalRHandler>();
            builder.Services.AddScoped<IChatRoomService, ChatRoomService>();
            builder.Services.AddScoped<IChatRoomMessageService, ChatRoomMessageService>();
            builder.Services.AddSingleton<IChatRoomManager, ChatRoomManager>();
            builder.Services.AddTransient<IValidator<SendChatRoomMessageViewModel>, CreateChatRoomMessageValidator>();
            builder.Services.AddSingleton<ICommandService, CommandsService>();

            var address = new MongoServerAddress(builder.Configuration["MONGO_CONNECTION_STRING"]);

            string connStringMongo = new MongoUrlBuilder()
            {
                Server = address,
                Username = builder.Configuration["MONGO_INITDB_ROOT_USERNAME"],
                Password = builder.Configuration["MONGO_INITDB_ROOT_PASSWORD"],
            }.ToString();

            builder.Services.Configure<PunishmentDatabaseSettings>(settings =>
            {
                settings.ConnectionString = connStringMongo;
                settings.DatabaseName = "PunishmentsStore";
                settings.PunishmentCollectionName = "PunishmentsCollection";
            });

            

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
                            (path.StartsWithSegments($"/{HubURLs.ChatURL}")))
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

            builder.Services.AddAuthorizationBuilder()
                .AddPolicy(Policies.IsAuthenticatedSignalR, policy => policy.Requirements.Add(
                    new IsAuthenticatedSignalRRequirement()))
                .AddPolicy(Policies.IsModeratorSignalR, policy =>
                {
                    policy.Requirements.Add(new IsAuthenticatedSignalRRequirement());
                    policy.Requirements.Add(new HasRoleSignalRRequirement(Roles.Moderator));
                })
                .AddPolicy(Policies.IsAdminSignalR, policy =>
                {
                    policy.Requirements.Add(new IsAuthenticatedSignalRRequirement());
                    policy.Requirements.Add(new HasRoleSignalRRequirement(Roles.Admin));
                })
                .AddPolicy(Policies.IsChatModeratorSignalR, policy =>
                {
                    policy.Requirements.Add(new IsAuthenticatedSignalRRequirement());
                    policy.Requirements.Add(new HasRoleSignalRRequirement(Roles.ChatModerator));
                })
                .AddPolicy(Policies.IsChatModerator, policy =>
                {
                    policy.Requirements.Add(new IsAuthenticatedRequirement());
                    policy.Requirements.Add(new HasRoleRequirement(Roles.ChatModerator));
                })
                .AddPolicy(Policies.IsModerator, policy =>
                {
                    policy.Requirements.Add(new IsAuthenticatedRequirement());
                    policy.Requirements.Add(new HasRoleRequirement(Roles.Moderator));
                }).AddPolicy(Policies.IsAdmin, policy =>
                {
                    policy.Requirements.Add(new IsAuthenticatedRequirement());
                    policy.Requirements.Add(new HasRoleRequirement(Roles.Admin));
                });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
            app.UseCors(options =>
            {
                string? origin = builder.Configuration["ALLOWED_ORIGINS"];
                origin ??= "localhost";
                options.WithOrigins(origin);
                options.WithMethods("GET", "POST", "PUT", "DELETE", "PATCH");
                options.AllowAnyHeader();
                options.AllowCredentials();
            });

            app.MapHub<ChatHub>($"/{HubURLs.ChatURL}");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();
            


            app.MapControllers();
            app.SeedAdministrator(builder.Configuration["ADMIN_USERNAME"] ?? "admin", builder.Configuration["ADMIN_PASSWORD"] ?? "admin");

            app.Run();
        }
    }
}
