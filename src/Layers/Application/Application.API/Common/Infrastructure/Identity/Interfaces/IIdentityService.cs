using System.Threading.Tasks;
using Application.API.Storage.Users.Core.Models.Domain;

namespace Application.API.Common.Infrastructure.Identity.Interfaces
{
    public interface IIdentityService : IIdentityServer<ApplicationUser>
    {
        public Task<ApplicationUser> FindByIdAsync(string userId);
        public Task<ApplicationUser> FindByNameAsync(string userName);
        public Task<bool> IsInRoleAsync(string userName, string role);
        public Task<(IdentityResult Result, JwtToken Token)> SigninAsync(string userName, string password);
        public Task<(IdentityResult Result, JwtToken Token)> SignupAsync(string userName, string password);
    }
}