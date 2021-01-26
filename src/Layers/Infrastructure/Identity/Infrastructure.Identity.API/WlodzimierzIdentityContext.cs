using System.Reflection;
using Application.Infrastructure.Identity.API.Models;
using Infrastructure.EntityFramework.API.Design.Abstractions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using IdentityOptions = Infrastructure.Identity.API.Options.IdentityOptions;

namespace Infrastructure.Identity.API
{
    public class WlodzimierzIdentityContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
        public WlodzimierzIdentityContext(DbContextOptions<WlodzimierzIdentityContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }

        // ReSharper disable once UnusedType.Global
        public class Factory : AbstractDbContextFactory<WlodzimierzIdentityContext>
        {
            public Factory() : base(IdentityOptions.Database)
            {
            }

            protected override WlodzimierzIdentityContext CreateNewInstance(
                DbContextOptions<WlodzimierzIdentityContext> options)
            {
                return new(options);
            }
        }
    }
}