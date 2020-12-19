using Application.API.Storage.Contacts;
using Application.API.Storage.Contacts.Mutations;
using Application.API.Storage.Contacts.Queries;
using Microsoft.Extensions.DependencyInjection;

namespace Application.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddGraphQLServer()
                .AddQueryType(d => d.Name("Query"))
                .AddType<ContactQueries>()
                .AddMutationType(d => d.Name("Mutation"))
                .AddType<ContactMutations>()
                .AddType<ContactType>()
                .AddFiltering()
                .AddSorting()
                .EnableRelaySupport()
                .AddDataLoader<ContactByIdDataLoader>();

            return services;
        }
    }
}