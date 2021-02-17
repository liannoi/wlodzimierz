using System.Linq;
using Microsoft.AspNetCore.Identity;
using IdentityResult = Application.Infrastructure.Identity.API.Common.Models.IdentityResult;

namespace Infrastructure.Identity.API.Extensions
{
    public static class IdentityResultExtensions
    {
        public static IdentityResult ToApplicationResult(this Microsoft.AspNetCore.Identity.IdentityResult result)
        {
            return result.Succeeded
                ? IdentityResult.Success()
                : IdentityResult.Failure(result.Errors.Select(e => e.Description));
        }

        public static IdentityResult ToApplicationResult(this PasswordVerificationResult result)
        {
            return result == PasswordVerificationResult.Success
                ? IdentityResult.Success()
                : IdentityResult.Failures("The current password is incorrect.");
        }
    }
}