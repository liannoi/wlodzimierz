using Application.Infrastructure.Persistence.API.Interfaces;
using Infrastructure.Persistence.API.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TestingOptions = Infrastructure.EntityFramework.API.Common.Options.TestingOptions;

namespace Infrastructure.Persistence.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services,
            IConfiguration configuration)
        {
            var useInMemoryDatabase =
                configuration.GetValue<bool>(TestingOptions.UseInMemoryDatabase);

            if (useInMemoryDatabase)
                services.AddDbContext<WlodzimierzContext>(options =>
                    options.UseInMemoryDatabase(Options.TestingOptions.InMemoryPrimaryDatabase));
            else
                services.AddDbContext<WlodzimierzContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString(PersistenceOptions.PrimaryDatabase)));

            services.AddScoped<IWlodzimierzContext>(provider => provider.GetService<WlodzimierzContext>()!);

            return services;
        }
    }
}