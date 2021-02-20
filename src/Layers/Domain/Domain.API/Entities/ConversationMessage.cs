using System;
using System.Collections.Generic;
using Domain.API.Common.Notifications.Abstractions;
using Domain.API.Common.Notifications.Interfaces;

#nullable disable

namespace Domain.API.Entities
{
    public class ConversationMessage : INotifiable
    {
        public int ConversationMessageId { get; set; }
        public int ConversationId { get; set; }
        public string OwnerUserId { get; set; }
        public string Message { get; set; }
        public DateTime Publish { get; set; }
        public bool IsRemoved { get; set; }

        public Conversation Conversation { get; set; }
        public IList<BaseNotification> Notifications { get; } = new List<BaseNotification>();
    }
}