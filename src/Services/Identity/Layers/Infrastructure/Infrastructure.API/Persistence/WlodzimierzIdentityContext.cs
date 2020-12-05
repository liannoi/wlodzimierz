using Domain.API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.API.Persistence
{
    public class WlodzimierzIdentityContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public WlodzimierzIdentityContext(DbContextOptions<WlodzimierzIdentityContext> options) : base(options)
        {
        }
    }
}