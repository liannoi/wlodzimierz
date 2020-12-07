using System.Threading.Tasks;
using Application.API.Storage.Identity.Models;

namespace Application.API.Common.Interfaces
{
    public interface IIdentityService : IIdentityServer<ApplicationUser>
    {
        public Task<ApplicationUser> GetUserAsync(string userName);

        public Task<ApplicationUser> GetUserByIdAsync(string userId);

        public Task<(IdentityResult Result, JwtToken Token)> Login(string userName, string password);

        public Task<(IdentityResult Result, JwtToken Token)> Signup(string userName, string password);

        public Task<bool> UserIsInRole(string userName, string role);
    }
}