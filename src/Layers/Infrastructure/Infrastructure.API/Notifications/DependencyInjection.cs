using Application.API.Common.Infrastructure.Notifications;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.API.Notifications
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