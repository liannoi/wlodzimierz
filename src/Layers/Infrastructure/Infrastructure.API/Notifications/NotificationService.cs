using System;
using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Notifications;
using Application.API.Common.Infrastructure.Notifications.Types.EntityChanged;
using Domain.API.Common.Notifications;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Infrastructure.API.Notifications
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
            return ((INotification) Activator.CreateInstance(
                typeof(EntityChangedNotification<>).MakeGenericType(notification.GetType()), notification))!;
        }
    }
}