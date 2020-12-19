using Application.API.Common.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.API.Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<WlodzimierzContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString(PersistenceDefaults.PrimaryDatabase)));
            
            services.AddScoped<IWlodzimierzContext>(provider => provider.GetService<WlodzimierzContext>()!);

            return services;
        }
    }
}