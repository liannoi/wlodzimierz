using Domain.API.Common.Notifications.Abstractions;
using Domain.API.Entities;

namespace Domain.API.Notifications.Conversations
{
    public class CreatedNotification : BaseNotification
    {
        public CreatedNotification(Conversation item)
        {
            Item = item;
        }

        public Conversation Item { get; }
    }
}