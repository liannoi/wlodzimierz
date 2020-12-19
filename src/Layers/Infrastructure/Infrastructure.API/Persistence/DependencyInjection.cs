using Application.API.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.API.Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddPooledDbContextFactory<WlodzimierzContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString(PersistenceDefaults.PrimaryDatabase)));

            services.AddTransient<IWlodzimierzContext>(provider =>
                provider.GetRequiredService<IDbContextFactory<WlodzimierzContext>>().CreateDbContext());

            return services;
        }
    }
}