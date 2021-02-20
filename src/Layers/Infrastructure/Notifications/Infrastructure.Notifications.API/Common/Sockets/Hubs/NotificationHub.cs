using System.Threading.Tasks;
using Application.Infrastructure.Notifications.API.Sockets;
using Domain.API.Common.Notifications.Abstractions;
using Infrastructure.Notifications.API.Common.Extensions;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Notifications.API.Common.Sockets.Hubs
{
    public class NotificationHub : Hub<INotificationSubscriber>, INotificationPublisher
    {
        private readonly IHubContext<NotificationHub, INotificationSubscriber> _hub;
        private readonly ILogger<NotificationHub> _logger;
        private readonly IPublisher _mediator;

        public NotificationHub(ILogger<NotificationHub> logger, IPublisher mediator,
            IHubContext<NotificationHub, INotificationSubscriber> hub)
        {
            _logger = logger;
            _mediator = mediator;
            _hub = hub;
        }

        public async Task PublishAsync(BaseNotification notification)
        {
            _logger.LogInformation("Publish notification: {Notification}", notification.GetType().Name);
            var wrappedNotification = notification.Wrap();
            await PublishConsoleAsync(wrappedNotification);
            await PublishSocketsAsync(wrappedNotification);
        }

        // Helpers.

        private async Task PublishSocketsAsync(INotification notification)
        {
            await _hub.Clients.All.SubscribeAsync(notification);
        }

        private async Task PublishConsoleAsync(INotification notification)
        {
            await _mediator.Publish(notification);
        }
    }
}