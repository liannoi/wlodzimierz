using System.Threading.Tasks;
using Application.Infrastructure.Identity.API;
using Application.Infrastructure.Identity.API.Interfaces;
using Application.Infrastructure.Identity.API.Models;
using Infrastructure.Identity.API.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using IdentityResult = Application.Infrastructure.Identity.API.Models.IdentityResult;

namespace Infrastructure.Identity.API.Services
{
    public class IdentityService : AbstractIdentityServer, IIdentityService
    {
        private readonly UserManager<ApplicationUser> _manager;

        public IdentityService(IOptions<JwtBearerOptions> settings, UserManager<ApplicationUser> manager) :
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
            var user = await FindByNameAsync(userName);
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

        public async Task<IdentityResult> DeleteAsync(string userId)
        {
            return (await _manager.DeleteAsync(await FindByIdAsync(userId))).ToApplicationResult();
        }

        public async Task<IdentityResult> UpdateAsync(string userId)
        {
            return (await _manager.UpdateAsync(await FindByIdAsync(userId))).ToApplicationResult();
        }
    }
}