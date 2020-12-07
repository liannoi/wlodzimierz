using System.Threading.Tasks;
using Application.API.Common.Interfaces;
using Application.API.Storage.Identity.Models;
using Infrastructure.API.Identity.Extensions;
using Infrastructure.API.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using IdentityResult = Application.API.Storage.Identity.Models.IdentityResult;

namespace Infrastructure.API.Identity.Services
{
    public class IdentityService : AbstractIdentityServer, IIdentityService
    {
        private readonly UserManager<ApplicationUser> _manager;

        public IdentityService(IOptions<IdentitySettings> settings, UserManager<ApplicationUser> manager) :
            base(settings)
        {
            _manager = manager;
        }

        public async Task<ApplicationUser> GetUserAsync(string userName)
        {
            return await _manager.FindByNameAsync(userName);
        }

        public async Task<ApplicationUser> GetUserByIdAsync(string userId)
        {
            return await _manager.Users.SingleOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<(IdentityResult Result, JwtToken Token)> Login(string userName, string password)
        {
            var user = await _manager.FindByNameAsync(userName);
            var isChecked = await _manager.CheckPasswordAsync(user, password);

            return (IdentityResult.Success(), new JwtToken {Value = CreateToken(user)});
        }

        public async Task<(IdentityResult Result, JwtToken Token)> Signup(string userName, string password)
        {
            var user = new ApplicationUser {UserName = userName, Email = userName};
            var result = await _manager.CreateAsync(user, password);

            return (result.ToApplicationResult(), new JwtToken {Value = CreateToken(user)});
        }

        public async Task<bool> UserIsInRole(string userName, string role)
        {
            return await _manager.IsInRoleAsync(await GetUserAsync(userName), role);
        }
    }
}