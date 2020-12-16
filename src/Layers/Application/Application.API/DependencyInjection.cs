using System.Reflection;
using Application.API.Common.Core.Behaviours;
using Application.API.Common.Infrastructure.Identity.Behaviours;
using Application.API.Common.Validation;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();

            #region AutoMapper - Mappings

            services.AddAutoMapper(assembly);

            #endregion

            #region FluentValidation - Validation

            services.AddValidatorsFromAssembly(assembly);

            #endregion

            #region MediatR - Storage, CQRS

            services.AddMediatR(assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UnhandledExceptionBehaviour<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(AuthorizationBehaviour<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(PerformanceBehaviour<,>));

            #endregion

            return services;
        }
    }
}