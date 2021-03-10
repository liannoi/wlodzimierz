using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Notifications.API.Common;
using Application.Infrastructure.Notifications.API.Console;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Storage.Contacts.Models;
using Domain.API.Notifications.Contacts;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Contacts.Notifications
{
    public class CreatedNotificationHandler : ConsoleNotificationHandler<CreatedNotification>
    {
        private readonly IWlodzimierzCachingContext _cache;

        public CreatedNotificationHandler(ILogger<CreatedNotificationHandler> logger, IWlodzimierzCachingContext cache)
            : base(logger)
        {
            _cache = cache;
        }

        public override Task Handle(WrapperNotification<CreatedNotification> notification,
            CancellationToken cancellationToken)
        {
            base.Handle(notification, cancellationToken);

            _cache.DeleteAsync<PaginatedList<ContactDto>>(new
                {notification.Notification.Item.OwnerUserId, PageNumber = 1, PageSize = 10});

            return Task.CompletedTask;
        }
    }
}