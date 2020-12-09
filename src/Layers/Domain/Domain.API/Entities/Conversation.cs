using System.Collections.Generic;

#nullable disable

namespace Domain.API.Entities
{
    public class Conversation
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
    }
}