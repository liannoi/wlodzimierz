using Application.Infrastructure.Notifications.API.Console;
using Domain.API.Notifications.ConversationMessages;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.ConversationMessages.Notifications
{
    public class CreatedNotificationHandler : ConsoleNotificationHandler<CreatedNotification>
    {
        public CreatedNotificationHandler(ILogger<CreatedNotificationHandler> logger) : base(logger)
        {
        }
    }
}