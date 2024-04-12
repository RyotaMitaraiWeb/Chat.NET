using Common.Authentication;
using Contracts;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Security.Claims;
using System.Text;
using Web.ViewModels.Authentication;

namespace Web.Services.Authentication
{
    public class JwtService(IConfiguration config) : IJwtService
    {
        private readonly IConfiguration config = config;

        public UserClaimsViewModel ExtractUserFromJWT(string jwt)
        {
            var handler = new JsonWebTokenHandler();
            var token = handler.ReadJsonWebToken(jwt);

            var user = new UserClaimsViewModel()
            {
                Id = token.Claims.First(t => t.Type == JwtClaims.Id).Value,
                Username = token.Claims.First(t => t.Type == JwtClaims.Username).Value,
            };

            return user;
        }

        public string GenerateJWT(UserClaimsViewModel user)
        {
            string? secret = this.config["JWT_SECRET"] ?? string.Empty;
            string? issuer = this.config["JWT_VALID_ISSUER"];
            string? audience = this.config["JWT_VALID_AUDIENCE"];

            IDictionary<string, object> claims = new Dictionary<string, object>
            {
                { JwtClaims.Id, user.Id },
                { JwtClaims.Username, user.Username }
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512);

            var handler = new JsonWebTokenHandler();
            var token = handler.CreateToken(new SecurityTokenDescriptor()
            {
                Audience = audience,
                Issuer = issuer,
                Expires = DateTime.Now.AddDays(2),
                SigningCredentials = credentials,
                Claims = claims,
                
            });

            return token;
        }

        public async Task<bool> ValidateJwt(string jwt)
        {
            var handler = new JsonWebTokenHandler();
            string? secret = this.config["JWT_SECRET"];
            secret ??= string.Empty;

            var issuer = this.config["JWT_VALID_ISSUER"];
            var audience = this.config["JWT_VALID_AUDIENCE"];

            string token = RemoveBearer(jwt);

            try
            {
                var result = await handler.ValidateTokenAsync(token, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                });

                return result?.IsValid == true;
            }
            catch
            {
                return false;
            }
        }

        private static string RemoveBearer(string? jwt)
        {
            if (jwt == null)
            {
                return string.Empty;
            }

            string token = jwt.Replace("Bearer ", "");
            return token;
        }
    }
}
