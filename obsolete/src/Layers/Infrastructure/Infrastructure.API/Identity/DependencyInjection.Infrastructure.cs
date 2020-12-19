using Application.API.Common.Infrastructure.Identity.Interfaces;
using Application.API.Storage.Users.Models.Domain;
using Infrastructure.API.Identity.Services;
using Infrastructure.API.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.API.Identity
{
    public static partial class DependencyInjection
    {
        public static IServiceCollection AddIdentityInfrastructure(this IServiceCollection services,
            IConfiguration configuration)
        {
            var useInMemoryDatabase = configuration.GetValue<bool>(PersistenceDefaults.UseInMemoryDatabase);

            if (useInMemoryDatabase)
                services.AddDbContext<WlodzimierzIdentityContext>(options =>
                    options.UseInMemoryDatabase(PersistenceDefaults.MemoryIdentityDatabase));
            else
                services.AddDbContext<WlodzimierzIdentityContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString(IdentityDefaults.IdentityDatabase),
                        b => b.MigrationsAssembly(typeof(WlodzimierzIdentityContext).Assembly.FullName)));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<WlodzimierzIdentityContext>();

            services.AddAuthorization();
            services.AddScoped<IIdentityService, IdentityService>();

            return services;
        }
    }
}