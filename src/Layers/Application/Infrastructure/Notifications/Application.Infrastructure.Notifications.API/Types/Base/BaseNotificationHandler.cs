using System.Threading;
using System.Threading.Tasks;
using Domain.API.Common.Notifications;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Infrastructure.Notifications.API.Types.Base
{
    public abstract class BaseNotificationHandler<TNotification> : INotificationHandler<BaseNotification<TNotification>>
        where TNotification : AbstractNotification
    {
        private readonly ILogger<BaseNotificationHandler<TNotification>> _logger;

        protected BaseNotificationHandler(ILogger<BaseNotificationHandler<TNotification>> logger)
        {
            _logger = logger;
        }

        public Task Handle(BaseNotification<TNotification> notification, CancellationToken cancellationToken)
        {
            _logger.LogInformation("[WLODZIMIERZ.API] Domain Event: {DomainEvent}",
                notification.Notification.GetType().Name);

            return Task.CompletedTask;
        }
    }
}