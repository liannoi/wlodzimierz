using System.Threading;
using System.Threading.Tasks;
using Domain.API.Common.Notifications;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Infrastructure.Notifications.API.Handlers.Console
{
    public abstract class
        ConsoleNotificationHandler<TNotification> : INotificationHandler<ConsoleNotification<TNotification>>
        where TNotification : AbstractNotification
    {
        private readonly ILogger<ConsoleNotificationHandler<TNotification>> _logger;

        protected ConsoleNotificationHandler(ILogger<ConsoleNotificationHandler<TNotification>> logger)
        {
            _logger = logger;
        }

        public Task Handle(ConsoleNotification<TNotification> notification, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Processing the notification. Handler: {Handler}. Notification: {Notification}",
                nameof(ConsoleNotificationHandler<TNotification>), notification.Notification.GetType().Name);

            return Task.CompletedTask;
        }
    }
}