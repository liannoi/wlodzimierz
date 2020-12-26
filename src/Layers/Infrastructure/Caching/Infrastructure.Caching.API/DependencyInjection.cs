using Application.Infrastructure.Caching.API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Caching.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddCaching(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = configuration.GetConnectionString(CachingOptions.CachingDatabase);
                options.InstanceName = CachingOptions.CachingInstanceName;
            });

            services.AddScoped<IWlodzimierzCachingContext, WlodzimierzCachingContext>();

            return services;
        }
    }
}