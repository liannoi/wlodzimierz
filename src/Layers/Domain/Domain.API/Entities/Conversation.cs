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

    public int ConversationId {
        get;
        set;
    }
    public int LeftUserId {
        get;
        set;
    }
    public int RightUserId {
        get;
        set;
    }

    public ICollection<ConversationMessage> ConversationMessages {
        get;
        set;
    }
}
}