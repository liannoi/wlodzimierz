using System.Reflection;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Mappings.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddMappingsApplication(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}