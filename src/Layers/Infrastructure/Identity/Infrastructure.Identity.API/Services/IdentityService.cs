using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API;
using Application.Infrastructure.Identity.API.Common.Exceptions;
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
        private readonly UrlEncoder _urlEncoder;
        private readonly UserManager<ApplicationUser> _userManager;

        public IdentityService(IOptions<JwtBearerOptions> settings, UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager, UrlEncoder urlEncoder) : base(settings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _urlEncoder = urlEncoder;
        }

        #region 2FA

        public async Task<RecoveryCodesList> GenerateRecoveryCodes(string userId)
        {
            var user = await FindByIdAsync(userId);
            // if (await _identityService.CountRecoveryCodesAsync(user) != 0) return Enumerable.Empty<string>();
            var codes = (await GenerateNewTwoFactorRecoveryCodesAsync(user, 16)).Select(e => new RecoveryCode
                {Value = e});

            return new RecoveryCodesList
                {FirstPart = codes.Take(8).ToList(), SecondPart = codes.Skip(8).Take(8).ToList()};
        }

        public async Task<Authenticator> SetupAuthenticator(string userId)
        {
            var user = await FindByIdAsync(userId);
            var unformattedKey = await PrepareKey(user);

            return new Authenticator
            {
                SharedKey = FormatKey(unformattedKey),
                AuthenticatorUri = GenerateQrCode(await GetEmailAsync(user), unformattedKey)
            };
        }

        public async Task VerifyCode(string userId, string verificationCode)
        {
            var user = await FindByIdAsync(userId);
            var parsedCode = verificationCode.Replace(" ", string.Empty).Replace("-", string.Empty);

            var is2FaTokenValid = await VerifyTwoFactorTokenAsync(user, parsedCode);
            if (!is2FaTokenValid) throw new ForbiddenAccessException();

            await SetTwoFactorEnabledAsync(user);
        }

        public async Task<IdentityResult> DisableTwoFactor(string userId)
        {
            var user = await FindByIdAsync(userId);
            if (!await GetTwoFactorEnabledAsync(user))
                throw new ForbiddenAccessException("Cannot disable 2FA as it's not currently enabled");

            return await SetTwoFactorEnabledAsync(user, false);
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

        #region Helpers

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

        public async Task<int> CountRecoveryCodesAsync(ApplicationUser user)
        {
            return await _userManager.CountRecoveryCodesAsync(user);
        }

        public async Task<IEnumerable<string>> GenerateNewTwoFactorRecoveryCodesAsync(ApplicationUser user, int count)
        {
            return await _userManager.GenerateNewTwoFactorRecoveryCodesAsync(user, count);
        }

        public async Task<bool> VerifyTwoFactorTokenAsync(ApplicationUser user, string verificationCode)
        {
            return await _userManager.VerifyTwoFactorTokenAsync(user,
                _userManager.Options.Tokens.AuthenticatorTokenProvider, verificationCode);
        }

        public async Task<IdentityResult> SetTwoFactorEnabledAsync(ApplicationUser user, bool enabled = true)
        {
            return (await _userManager.SetTwoFactorEnabledAsync(user, enabled)).ToApplicationResult();
        }

        private string FormatKey(string unformattedKey)
        {
            var result = new StringBuilder();
            var currentPosition = 0;
            while (currentPosition + 4 < unformattedKey.Length)
            {
                result.Append(unformattedKey.Substring(currentPosition, 4)).Append(' ');
                currentPosition += 4;
            }

            if (currentPosition < unformattedKey.Length) result.Append(unformattedKey.Substring(currentPosition));

            return result.ToString().ToLowerInvariant();
        }

        private string GenerateQrCode(string email, string unformattedKey)
        {
            const string authenticatorUriFormat = "otpauth://totp/{0}:{1}?secret={2}&issuer={0}&digits=6";

            return string.Format(authenticatorUriFormat, _urlEncoder.Encode("Wlodzimierz"),
                _urlEncoder.Encode(email), unformattedKey);
        }

        private async Task<string> PrepareKey(ApplicationUser user)
        {
            var unformattedKey = await GetAuthenticatorKeyAsync(user);
            if (!string.IsNullOrEmpty(unformattedKey)) return unformattedKey;

            await ResetAuthenticatorKeyAsync(user);
            unformattedKey = await GetAuthenticatorKeyAsync(user);

            return unformattedKey;
        }

        #endregion
    }
}