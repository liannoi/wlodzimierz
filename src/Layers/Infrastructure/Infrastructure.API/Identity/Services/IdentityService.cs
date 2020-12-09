using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Identity.Interfaces;
using Application.API.Storage.Identity.Models.Core;
using Infrastructure.API.Identity.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using IdentityResult = Application.API.Storage.Identity.Models.Core.IdentityResult;

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

        public async Task<ApplicationUser> FindByIdAsync(string userId)
        {
            return await _manager.FindByIdAsync(userId);
        }

        public async Task<ApplicationUser> FindByNameAsync(string userName)
        {
            return await _manager.FindByNameAsync(userName);
        }

        public async Task<bool> IsInRoleAsync(string userName, string role)
        {
            return await _manager.IsInRoleAsync(await FindByNameAsync(userName), role);
        }

        public async Task<(IdentityResult Result, JwtToken Token)> SigninAsync(string userName, string password)
        {
            var user = await _manager.FindByNameAsync(userName);
            var isCorrectPassword = await _manager.CheckPasswordAsync(user, password);

            return (isCorrectPassword
                ? (IdentityResult.Success(), new JwtToken {Value = CreateToken(user)})
                : (IdentityResult.Failure(), default))!;
        }

        public async Task<(IdentityResult Result, JwtToken Token)> SignupAsync(string userName, string password)
        {
            var user = new ApplicationUser {UserName = userName, Email = userName};
            var result = await _manager.CreateAsync(user, password);

            return (result.ToApplicationResult(), new JwtToken {Value = CreateToken(user)});
        }
    }
}