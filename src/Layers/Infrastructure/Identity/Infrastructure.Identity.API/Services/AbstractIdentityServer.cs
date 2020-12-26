using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Infrastructure.Identity.API;
using Application.Infrastructure.Identity.API.Interfaces;
using Application.Infrastructure.Identity.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Identity.API.Services
{
    public abstract class AbstractIdentityServer : IIdentityServer<ApplicationUser>
    {
        private readonly JwtBearerOptions _options;

        protected AbstractIdentityServer(IOptions<JwtBearerOptions> settings)
        {
            _options = settings.Value;
        }

        public string CreateToken(ApplicationUser user)
        {
            return new JwtSecurityTokenHandler().WriteToken(PrepareToken(user));
        }

        public string ReadToken(StringValues stream)
        {
            var parsed = stream.ToString().Replace("Bearer ", string.Empty);

            return new JwtSecurityTokenHandler().ReadJwtToken(parsed).Subject;
        }

        // Helpers.

        private JwtSecurityToken PrepareToken(IdentityUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Secret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var expires = DateTime.Now.AddMinutes(15);
            var issuer = _options.Issuer;

            return new JwtSecurityToken(issuer, issuer, claims, expires: expires, signingCredentials: credentials);
        }
    }
}