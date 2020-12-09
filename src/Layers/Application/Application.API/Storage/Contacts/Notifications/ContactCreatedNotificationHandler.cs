using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Notifications;
using Domain.API.Notifications.Contacts;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.API.Storage.Contacts.Notifications
{
    // ReSharper disable once UnusedType.Global
    public class ContactCreatedNotificationHandler :
        INotificationHandler<EntityChangedNotification<ContactCreatedNotification>>
    {
        private readonly ILogger<ContactCreatedNotificationHandler> _logger;

        public ContactCreatedNotificationHandler(ILogger<ContactCreatedNotificationHandler> logger)
        {
            _logger = logger;
        }

        public Task Handle(EntityChangedNotification<ContactCreatedNotification> notification,
            CancellationToken cancellationToken)
        {
            _logger.LogInformation("[WLODZIMIERZ.API] Domain Event: {DomainEvent}",
                notification.DomainEvent.GetType().Name);

            return Task.CompletedTask;
        }
    }
}