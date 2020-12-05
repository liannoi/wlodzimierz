using Application.API.Common;
using Application.API.Common.Persistence;
using Infrastructure.API.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services,
            IConfiguration configuration)
        {
            // Persistence.
            services.AddDbContext<WlodzimierzContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString(InfrastructureDefaults.Database)));

            services.AddScoped<IWlodzimierzContext>(provider => provider.GetService<WlodzimierzContext>()!);

            return services;
        }
    }
}