using Application.Infrastructure.Notifications.API.Types.Base;
using Domain.API.Notifications.Contacts;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Contacts.Notifications
{
    public class ContactCreatedNotificationHandler : BaseNotificationHandler<ContactCreatedNotification>
    {
        public ContactCreatedNotificationHandler(ILogger<BaseNotificationHandler<ContactCreatedNotification>> logger) :
            base(logger)
        {
        }
    }
}