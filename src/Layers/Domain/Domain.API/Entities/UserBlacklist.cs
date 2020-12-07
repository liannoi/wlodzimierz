#nullable disable

namespace Domain.API.Entities {
  public class UserBlacklist {
    public int OwnerUserId {
      get;
      set;
    }
    public int BlockedUserId {
      get;
      set;
    }
  }
}