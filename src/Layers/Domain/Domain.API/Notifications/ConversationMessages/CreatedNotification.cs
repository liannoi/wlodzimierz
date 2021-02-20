using Domain.API.Common.Notifications.Abstractions;
using Domain.API.Entities;

namespace Domain.API.Notifications.ConversationMessages
{
    public class CreatedNotification : BaseNotification
    {
        public CreatedNotification(ConversationMessage item)
        {
            Item = item;
        }

        public ConversationMessage Item { get; }
    }
}