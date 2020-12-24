using Application.Validation.API.Behaviours;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Validation.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddValidation(this IServiceCollection services)
        {
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));

            return services;
        }
    }
}