using System.Reflection;
using Application.Infrastructure.Notifications.API.Sockets;
using Infrastructure.Notifications.API.Common.Sockets.Hubs;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Notifications.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddNotifications(this IServiceCollection services)
        {
            services.AddScoped<INotificationPublisher, NotificationHub>();
            services.AddMediatR(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}