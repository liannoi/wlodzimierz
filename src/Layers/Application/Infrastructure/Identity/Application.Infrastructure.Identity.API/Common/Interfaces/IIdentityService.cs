using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Models;

namespace Application.Infrastructure.Identity.API.Common.Interfaces
{
    public interface IIdentityService : IIdentityServer<ApplicationUser>
    {
        #region 2FA

        public Task<RecoveryCodesList> GenerateRecoveryCodes(string userId);

        public Task<Authenticator> SetupAuthenticator(string userId);

        public Task VerifyCode(string userId, string verificationCode);

        public Task<IdentityResult> DisableTwoFactor(string userId);

        #endregion

        #region Authentication

        public Task<(IdentityResult Result, JwtToken Token)>
            SignUpAsync(string userName, string email, string password);

        public Task<(IdentityResult Result, JwtToken Token)> SignInAsync(string userName, string password);

        #endregion

        #region Search

        public Task<ApplicationUser> FindByIdAsync(string userId);

        public Task<ApplicationUser> FindByNameAsync(string userName);

        #endregion

        #region CRUD

        public IQueryable<ApplicationUser> GetAll();

        public Task<string> GetEmailAsync(ApplicationUser user);

        public Task<IdentityResult> UpdateAsync(ApplicationUser user);

        public Task<IdentityResult> UpdateAsync(ApplicationUser user, string password);

        public Task<IdentityResult> DeleteAsync(string userId);

        #endregion

        #region Checks

        public Task<bool> IsInRoleAsync(string userName, string role);

        public IdentityResult VerifyPassword(ApplicationUser user, string password);

        #endregion

        #region Helpers

        public Task<bool> GetTwoFactorEnabledAsync(ApplicationUser user);

        public Task<string?> GetAuthenticatorKeyAsync(ApplicationUser user);

        public Task<IdentityResult> ResetAuthenticatorKeyAsync(ApplicationUser user);

        public Task<bool> IsTwoFactorClientRememberedAsync(ApplicationUser user);

        public Task<int> CountRecoveryCodesAsync(ApplicationUser user);

        public Task<IEnumerable<string>> GenerateNewTwoFactorRecoveryCodesAsync(ApplicationUser user, int count);

        public Task<bool> VerifyTwoFactorTokenAsync(ApplicationUser user, string verificationCode);

        public Task<IdentityResult> SetTwoFactorEnabledAsync(ApplicationUser user, bool enabled = true);

        #endregion
    }
}