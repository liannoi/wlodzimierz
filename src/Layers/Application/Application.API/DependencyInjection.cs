using Application.API.Storage.Contacts;
using Application.API.Storage.Contacts.DataLoaders;
using Application.API.Storage.Contacts.Types;
using Microsoft.Extensions.DependencyInjection;

namespace Application.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddGraphQLServer()
                .AddQueryType<ContactQueries>()
                .AddMutationType<ContactMutations>()
                .AddType<ContactType>()
                .AddDataLoader<ContactByIdDataLoader>();

            return services;
        }
    }
}