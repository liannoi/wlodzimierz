using System.Collections.Generic;

#nullable disable

namespace Domain.API.Entities
{
public class Group
{
    public Group()
    {
        GroupAdministrators = new HashSet<GroupAdministrator>();
        GroupBlacklists = new HashSet<GroupBlacklist>();
        GroupMessages = new HashSet<GroupMessage>();
        UserGroups = new HashSet<UserGroup>();
    }

    public int GroupId {
        get;
        set;
    }
    public string Name {
        get;
        set;
    }

    public ICollection<GroupAdministrator> GroupAdministrators {
        get;
        set;
    }
    public ICollection<GroupBlacklist> GroupBlacklists {
        get;
        set;
    }
    public ICollection<GroupMessage> GroupMessages {
        get;
        set;
    }
    public ICollection<UserGroup> UserGroups {
        get;
        set;
    }
}
}