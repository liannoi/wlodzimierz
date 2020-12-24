using Application.Infrastructure.Identity.API.Behaviours;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Infrastructure.Identity.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddIdentityInfrastructureForApplication(this IServiceCollection services)
        {
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(AuthorizationBehaviour<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(PerformanceBehaviour<,>));

            return services;
        }
    }
}