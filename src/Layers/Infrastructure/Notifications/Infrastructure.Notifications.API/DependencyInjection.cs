using Application.Infrastructure.Notifications.API.Interfaces;
using Infrastructure.Notifications.API.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Notifications.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddNotifications(this IServiceCollection services)
        {
            services.AddScoped<INotificationService, NotificationService>();

            return services;
        }
    }
}