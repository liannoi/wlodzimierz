using Application.Infrastructure.Notifications.API.Handlers.Console;
using Domain.API.Notifications.Contacts;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Contacts.Notifications
{
    public class ContactCreatedNotificationHandler : ConsoleNotificationHandler<ContactCreatedNotification>
    {
        public ContactCreatedNotificationHandler(ILogger<ContactCreatedNotificationHandler> logger) : base(logger)
        {
        }
    }
}