using Application.API.Storage.Contacts;
using Microsoft.Extensions.DependencyInjection;

namespace Application.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddGraphQLServer()
                .AddQueryType<ContactQueries>()
                .AddMutationType<ContactMutations>();

            return services;
        }
    }
}