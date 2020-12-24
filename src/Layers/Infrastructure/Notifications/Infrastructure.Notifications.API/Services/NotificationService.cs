using System;
using System.Threading.Tasks;
using Application.Infrastructure.Notifications.API.Interfaces;
using Application.Infrastructure.Notifications.API.Types.EntityChanged;
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
            _logger.LogInformation("Publishing domain event. Event - {event}", notification.GetType().Name);
            await _mediator.Publish(GetNotificationCorrespondingToDomainEvent(notification));
        }

        // Helpers.

        private INotification GetNotificationCorrespondingToDomainEvent(AbstractNotification notification)
        {
            var genericType = typeof(EntityChangedNotification<>).MakeGenericType(notification.GetType());

            return (Activator.CreateInstance(genericType, notification) as INotification)!;
        }
    }
}