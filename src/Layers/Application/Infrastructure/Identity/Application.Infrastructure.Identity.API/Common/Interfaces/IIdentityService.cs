using System.Linq;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Models;

namespace Application.Infrastructure.Identity.API.Common.Interfaces
{
    public interface IIdentityService : IIdentityServer<ApplicationUser>
    {
        public Task<(IdentityResult Result, JwtToken Token)>
            SignUpAsync(string userName, string email, string password);

        public Task<(IdentityResult Result, JwtToken Token)> SignInAsync(string userName, string password);

        public Task<ApplicationUser> FindByIdAsync(string userId);

        public Task<ApplicationUser> FindByNameAsync(string userName);

        public IQueryable<ApplicationUser> GetAll();

        public Task<bool> IsInRoleAsync(string userName, string role);

        public Task<IdentityResult> UpdateAsync(ApplicationUser user);

        public Task<IdentityResult> UpdateAsync(ApplicationUser user, string password);

        public IdentityResult VerifyPassword(ApplicationUser user, string password);

        public Task<IdentityResult> DeleteAsync(string userId);
    }
}