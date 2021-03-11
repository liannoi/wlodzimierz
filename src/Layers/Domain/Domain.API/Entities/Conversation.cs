using System.Collections.Generic;
using Domain.API.Common.Notifications.Abstractions;
using Domain.API.Common.Notifications.Interfaces;

#nullable disable

namespace Domain.API.Entities
{
    public class Conversation : INotifiable
    {
        public Conversation()
        {
            ConversationMessages = new HashSet<ConversationMessage>();
        }

        public int ConversationId { get; set; }
        public string LeftUserId { get; set; }
        public string RightUserId { get; set; }
        public bool IsRemoved { get; set; }

        public ICollection<ConversationMessage> ConversationMessages { get; set; }
        public IList<BaseNotification> Notifications { get; set; } = new List<BaseNotification>();
    }
}