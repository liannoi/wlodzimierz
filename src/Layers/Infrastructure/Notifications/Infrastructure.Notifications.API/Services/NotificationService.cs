using System;
using System.Threading.Tasks;
using Application.Infrastructure.Notifications.API.Handlers.Console;
using Application.Infrastructure.Notifications.API.Interfaces;
using Domain.API.Common.Notifications;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Notifications.API.Services
{
    public class NotificationService : INotificationService
    {
        private readonly ILogger<NotificationService> _logger;
        private readonly IPublisher _mediator;

        public NotificationService(ILogger<NotificationService> logger, IPublisher mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        public async Task Publish(AbstractNotification notification)
        {
            _logger.LogInformation("Publish notification {Notification}", notification.GetType().Name);
            await _mediator.Publish(GetNotificationCorrespondingToDomainEvent(notification));
        }

        // Helpers.

        private INotification GetNotificationCorrespondingToDomainEvent(AbstractNotification notification)
        {
            var genericType = typeof(ConsoleNotification<>).MakeGenericType(notification.GetType());

            return (Activator.CreateInstance(genericType, notification) as INotification)!;
        }
    }
}