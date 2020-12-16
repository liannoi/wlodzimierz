using Application.API.Common.Infrastructure.Caching;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.API.Caching
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddCaching(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = configuration.GetConnectionString(CachingDefaults.CachingDatabase);
                options.InstanceName = CachingDefaults.CachingInstanceName;
            });

            services.AddScoped<IWlodzimierzCachingContext, WlodzimierzCachingContext>();

            return services;
        }
    }
}