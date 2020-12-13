using Application.API.Common.Notifications.Types.EntityChanged;
using Domain.API.Notifications.Contacts;
using Microsoft.Extensions.Logging;

namespace Application.API.Storage.Contacts.Core.Notifications
{
    // ReSharper disable once UnusedType.Global
    public class ContactCreatedNotificationHandler : EntityChangedNotificationHandler<ContactCreatedNotification>
    {
        public ContactCreatedNotificationHandler(ILogger<ContactCreatedNotificationHandler> logger) : base(logger)
        {
        }
    }
}