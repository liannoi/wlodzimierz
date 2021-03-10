using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Notifications.API.Common;
using Domain.API.Common.Notifications.Abstractions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Infrastructure.Notifications.API.Console
{
    public abstract class ConsoleNotificationHandler<TNotification> :
        INotificationHandler<WrapperNotification<TNotification>> where TNotification : BaseNotification
    {
        private readonly ILogger<ConsoleNotificationHandler<TNotification>> _logger;

        protected ConsoleNotificationHandler(ILogger<ConsoleNotificationHandler<TNotification>> logger)
        {
            _logger = logger;
        }

        public virtual Task Handle(WrapperNotification<TNotification> notification, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Processing the notification. Handler: {Handler}. Notification: {Notification}",
                nameof(ConsoleNotificationHandler<TNotification>), notification.Notification.GetType().Name);

            return Task.CompletedTask;
        }
    }
}