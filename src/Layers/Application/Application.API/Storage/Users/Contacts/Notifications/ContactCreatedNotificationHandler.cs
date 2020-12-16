using Application.API.Common.Infrastructure.Notifications.Types.EntityChanged;
using Domain.API.Notifications.Contacts;
using Microsoft.Extensions.Logging;

namespace Application.API.Storage.Users.Contacts.Notifications
{
    public class ContactCreatedNotificationHandler : EntityChangedNotificationHandler<ContactCreatedNotification>
    {
        public ContactCreatedNotificationHandler(ILogger<ContactCreatedNotificationHandler> logger) : base(logger)
        {
        }
    }
}