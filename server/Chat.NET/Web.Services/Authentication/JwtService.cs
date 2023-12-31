using Common.Authentication;
using Contracts;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson.IO;
using System.IdentityModel.Tokens.Jwt;
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
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(
                RemoveBearer(jwt));

            var user = new UserClaimsViewModel()
            {
                Id = token.Claims.First(t => t.Type == JwtClaims.Id).Value,
                Username = token.Claims.First(t => t.Type == JwtClaims.Username).Value,
            };

            return user;
        }

        public string GenerateJWT(UserClaimsViewModel user)
        {
            string? secret = this.config["JWT_SECRET"];
            secret ??= string.Empty;
            var issuer = this.config["JWT_VALID_ISSUER"];
            var audience = this.config["JWT_VALID_AUDIENCE"];

            var claims = new List<Claim>
            {
                new(JwtClaims.Id, user.Id),
                new(JwtClaims.Username, user.Username),
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddDays(2),
                signingCredentials:
                    new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512)
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool ValidateJwt(string jwt)
        {
            var handler = new JwtSecurityTokenHandler();
            string? secret = this.config["JWT_SECRET"];
            secret ??= string.Empty;

            var issuer = this.config["JWT_VALID_ISSUER"];
            var audience = this.config["JWT_VALID_AUDIENCE"];

            try
            {
                handler.ValidateToken(RemoveBearer(jwt), new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                }, out SecurityToken validatedToken);

                return true;
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
