using Application.Infrastructure.Identity.API.Models;
using Infrastructure.Identity.API.Abstractions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity.API
{
    public class WlodzimierzIdentityContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
        public WlodzimierzIdentityContext(DbContextOptions<WlodzimierzIdentityContext> options) : base(options)
        {
        }

        // ReSharper disable once UnusedType.Global
        public class Factory : AbstractDbContextFactory<WlodzimierzIdentityContext>
        {
            protected override WlodzimierzIdentityContext CreateNewInstance(
                DbContextOptions<WlodzimierzIdentityContext> options)
            {
                return new(options);
            }
        }
    }
}