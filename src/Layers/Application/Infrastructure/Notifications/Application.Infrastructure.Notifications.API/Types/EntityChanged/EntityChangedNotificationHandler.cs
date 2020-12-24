using System.Threading;
using System.Threading.Tasks;
using Domain.API.Common.Notifications;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Infrastructure.Notifications.API.Types.EntityChanged
{
    public abstract class EntityChangedNotificationHandler<TNotification> :
        INotificationHandler<EntityChangedNotification<TNotification>> where TNotification : AbstractNotification
    {
        private readonly ILogger<EntityChangedNotificationHandler<TNotification>> _logger;

        protected EntityChangedNotificationHandler(ILogger<EntityChangedNotificationHandler<TNotification>> logger)
        {
            _logger = logger;
        }

        public Task Handle(EntityChangedNotification<TNotification> notification, CancellationToken cancellationToken)
        {
            _logger.LogInformation("[WLODZIMIERZ.API] Domain Event: {DomainEvent}",
                notification.Notification.GetType().Name);

            return Task.CompletedTask;
        }
    }
}