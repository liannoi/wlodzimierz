using Domain.API.Notifications.ConversationMessages;
using Infrastructure.Notifications.API.Common.Sockets.Handlers;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Notifications.API.Sockets.ConversationMessages
{
    public class CreatedNotificationHandler : SocketNotificationHandler<CreatedNotification>
    {
        public CreatedNotificationHandler(ILogger<CreatedNotificationHandler> logger) : base(logger)
        {
        }
    }
}