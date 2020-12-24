using Application.Infrastructure.Persistence.API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Persistence.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services,
            IConfiguration configuration)
        {
            var useInMemoryDatabase = configuration.GetValue<bool>(TestingSettings.UseInMemoryDatabase);

            if (useInMemoryDatabase)
                services.AddDbContext<WlodzimierzContext>(options =>
                    options.UseInMemoryDatabase(TestingSettings.InMemoryPrimaryDatabase));
            else
                services.AddDbContext<WlodzimierzContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString(PersistenceSettings.PrimaryDatabase)));

            services.AddScoped<IWlodzimierzContext>(provider => provider.GetService<WlodzimierzContext>()!);

            return services;
        }
    }
}