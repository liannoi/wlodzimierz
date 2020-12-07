using System.Threading.Tasks;
using Application.API.Storage.Identity.Models;

namespace Application.API.Common.Interfaces {
  public interface IIdentityService : IIdentityServer<ApplicationUser> {
    public Task<ApplicationUser> FindByIdAsync(string userId);
    public Task<ApplicationUser> FindByNameAsync(string userName);
    public Task<bool> IsInRoleAsync(string userName, string role);
    public Task<(IdentityResult Result, JwtToken Token)> LoginAsync(
        string userName, string password);
    public Task<(IdentityResult Result, JwtToken Token)> SignupAsync(
        string userName, string password);
  }
}