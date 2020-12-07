using System.Threading.Tasks;
using Application.API.Common.Interfaces;
using Application.API.Storage.Identity.Models;
using Infrastructure.API.Identity.Server;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using IdentityResult = Application.API.Storage.Identity.Models.IdentityResult;

namespace Infrastructure.API.Identity.Core
{
    public class IdentityService : AbstractIdentityServer, IIdentityService
    {
        private readonly UserManager<ApplicationUser> _manager;

        public IdentityService(IOptions<IdentitySettings> settings, UserManager<ApplicationUser> manager) :
            base(settings)
        {
            _manager = manager;
        }

        public async Task<ApplicationUser> FindByIdAsync(string userId)
        {
            return await _manager.FindByIdAsync(userId);
        }

        public async Task<ApplicationUser> FindByNameAsync(string userName)
        {
            return await _manager.FindByNameAsync(userName);
        }

        public async Task<bool> IsInRoleAsync(string userId, string role)
        {
            return await _manager.IsInRoleAsync(await FindByIdAsync(userId), role);
        }

        public async Task<(IdentityResult Result, JwtToken Token)> LoginAsync(string userName, string password)
        {
            var user = await _manager.FindByNameAsync(userName);
            var isChecked = await _manager.CheckPasswordAsync(user, password);

            return (IdentityResult.Success(), new JwtToken {Value = CreateToken(user)});
        }

        public async Task<(IdentityResult Result, JwtToken Token)> SignupAsync(string userName, string password)
        {
            var user = new ApplicationUser {UserName = userName, Email = userName};
            var result = await _manager.CreateAsync(user, password);

            return (result.ToApplicationResult(), new JwtToken {Value = CreateToken(user)});
        }
    }
}