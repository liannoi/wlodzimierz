using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Notifications.API.Common;
using Domain.API.Common.Notifications.Abstractions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Notifications.API.Common.Sockets.Handlers
{
    public abstract class SocketNotificationHandler<TNotification> :
        INotificationHandler<WrapperNotification<TNotification>> where TNotification : BaseNotification
    {
        private readonly ILogger<SocketNotificationHandler<TNotification>> _logger;

        protected SocketNotificationHandler(ILogger<SocketNotificationHandler<TNotification>> logger)
        {
            _logger = logger;
        }

        public Task Handle(WrapperNotification<TNotification> notification, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Processing the notification. Handler: {Handler}. Notification: {Notification}",
                nameof(SocketNotificationHandler<TNotification>), notification.Notification.GetType().Name);

            return Task.CompletedTask;
        }
    }
}