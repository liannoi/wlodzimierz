#nullable disable

namespace Domain.API.Entities {
  public class GroupBlacklist {
    public int GroupId {
      get;
      set;
    }
    public int BlockedUserId {
      get;
      set;
    }

    public Group Group {
      get;
      set;
    }
  }
}