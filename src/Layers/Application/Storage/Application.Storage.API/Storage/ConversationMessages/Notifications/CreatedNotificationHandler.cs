using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Notifications.API.Common;
using Application.Infrastructure.Notifications.API.Console;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Domain.API.Notifications.ConversationMessages;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.ConversationMessages.Notifications
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

            _cache.DeleteAsync<PaginatedList<ConversationMessageDto>>(new
                {notification.Notification.Item.ConversationId, PageNumber = 1, PageSize = 99});

            return Task.CompletedTask;
        }
    }
}