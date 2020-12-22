using System;

#nullable disable

namespace Domain.API.Entities
{
    public class ConversationMessage
    {
        public int ConversationMessageId { get; set; }
        public int ConversationId { get; set; }
        public string OwnerUserId { get; set; }
        public string Message { get; set; }
        public DateTime Publish { get; set; }
        public bool IsRemoved { get; set; }

        public Conversation Conversation { get; set; }
    }
}