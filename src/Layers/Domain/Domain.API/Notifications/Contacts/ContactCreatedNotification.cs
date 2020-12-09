using Domain.API.Common.Notifications;
using Domain.API.Entities;

namespace Domain.API.Notifications.Contacts
{
    public class ContactCreatedNotification : AbstractNotification
    {
        public ContactCreatedNotification(Contact item)
        {
            Item = item;
        }

        public Contact Item { get; }
    }
}