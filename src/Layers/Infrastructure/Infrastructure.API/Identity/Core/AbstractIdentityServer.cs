using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.API.Common.Interfaces;
using Application.API.Storage.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.API.Identity.Core {
  public abstract class AbstractIdentityServer
      : IIdentityServer<ApplicationUser> {
    private readonly IdentitySettings _settings;

    protected AbstractIdentityServer(IOptions<IdentitySettings> settings) {
      _settings = settings.Value;
    }

    public string CreateToken(ApplicationUser user) {
      return new JwtSecurityTokenHandler().WriteToken(PrepareToken(user));
    }

    public string ReadToken(StringValues stream) {
      var parsed = stream.ToString().Replace("Bearer ", string.Empty);

      return new JwtSecurityTokenHandler().ReadJwtToken(parsed).Subject;
    }

    // Helpers.

    private JwtSecurityToken PrepareToken(IdentityUser user) {
      var securityKey =
          new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Secret));
      var credentials =
          new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

      var claims = new[]{
          new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
          new Claim(JwtRegisteredClaimNames.Email, user.Email),
          new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())};

      var expires = DateTime.Now.AddMinutes(15);
      var issuer = _settings.Issuer;

      return new JwtSecurityToken(issuer, issuer, claims, expires
                                  : expires, signingCredentials
                                  : credentials);
    }
  }
}