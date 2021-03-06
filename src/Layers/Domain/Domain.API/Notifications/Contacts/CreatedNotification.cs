using Domain.API.Common.Notifications.Abstractions;
using Domain.API.Entities;

namespace Domain.API.Notifications.Contacts
{
    public class CreatedNotification : BaseNotification
    {
        public CreatedNotification(Contact item)
        {
            Item = item;
        }

        public Contact Item { get; }
    }
}