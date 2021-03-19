using System.Linq;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Infrastructure.Identity.API.Common.Models;
using Infrastructure.Identity.API.Common.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using IdentityResult = Application.Infrastructure.Identity.API.Common.Models.IdentityResult;

namespace Infrastructure.Identity.API.Services
{
    public class IdentityService : AbstractIdentityServer, IIdentityService
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public IdentityService(IOptions<JwtBearerOptions> settings, UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager) :
            base(settings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        #region 2FA

        public async Task<bool> GetTwoFactorEnabledAsync(ApplicationUser user)
        {
            return await _userManager.GetTwoFactorEnabledAsync(user);
        }

        public async Task<string?> GetAuthenticatorKeyAsync(ApplicationUser user)
        {
            return await _userManager.GetAuthenticatorKeyAsync(user);
        }

        public async Task<IdentityResult> ResetAuthenticatorKeyAsync(ApplicationUser user)
        {
            return (await _userManager.ResetAuthenticatorKeyAsync(user)).ToApplicationResult();
        }

        public async Task<bool> IsTwoFactorClientRememberedAsync(ApplicationUser user)
        {
            return await _signInManager.IsTwoFactorClientRememberedAsync(user);
        }

        #endregion

        #region Authentication

        public async Task<(IdentityResult Result, JwtToken Token)> SignUpAsync(string userName, string email,
            string password)
        {
            var user = new ApplicationUser {UserName = userName, Email = email};
            var result = await _userManager.CreateAsync(user, password);

            return (result.ToApplicationResult(), new JwtToken {Value = CreateToken(user)});
        }

        public async Task<(IdentityResult Result, JwtToken Token)> SignInAsync(string userName, string password)
        {
            var user = await FindByNameAsync(userName);
            var isCorrectPassword = await _userManager.CheckPasswordAsync(user, password);

            return (isCorrectPassword
                ? (IdentityResult.Success(), new JwtToken {Value = CreateToken(user)})
                : (IdentityResult.Failure(), default))!;
        }

        #endregion

        #region Search

        public async Task<ApplicationUser> FindByIdAsync(string userId)
        {
            return await _userManager.FindByIdAsync(userId);
        }

        public async Task<ApplicationUser> FindByNameAsync(string userName)
        {
            return await _userManager.FindByNameAsync(userName);
        }

        #endregion

        #region CRUD

        public IQueryable<ApplicationUser> GetAll()
        {
            return _userManager.Users;
        }

        public async Task<string> GetEmailAsync(ApplicationUser user)
        {
            return await _userManager.GetEmailAsync(user);
        }

        public async Task<IdentityResult> UpdateAsync(ApplicationUser user)
        {
            return (await _userManager.UpdateAsync(user)).ToApplicationResult();
        }

        public async Task<IdentityResult> UpdateAsync(ApplicationUser user, string password)
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            return (await _userManager.ResetPasswordAsync(user, token, password)).ToApplicationResult();
        }

        public async Task<IdentityResult> DeleteAsync(string userId)
        {
            return (await _userManager.DeleteAsync(await FindByIdAsync(userId))).ToApplicationResult();
        }

        #endregion

        #region Checks

        public async Task<bool> IsInRoleAsync(string userName, string role)
        {
            return await _userManager.IsInRoleAsync(await FindByNameAsync(userName), role);
        }

        public IdentityResult VerifyPassword(ApplicationUser user, string password)
        {
            return _userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, password)
                .ToApplicationResult();
        }

        #endregion
    }
}