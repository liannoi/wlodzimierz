using Application.Infrastructure.Notifications.API.Console;
using Domain.API.Notifications.Contacts;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Contacts.Notifications
{
    public class CreatedNotificationHandler : ConsoleNotificationHandler<CreatedNotification>
    {
        public CreatedNotificationHandler(ILogger<CreatedNotificationHandler> logger) : base(logger)
        {
        }
    }
}