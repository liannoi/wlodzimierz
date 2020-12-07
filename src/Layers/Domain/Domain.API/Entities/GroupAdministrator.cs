#nullable disable

namespace Domain.API.Entities {
  public class GroupAdministrator {
    public int GroupId {
      get;
      set;
    }
    public int AdministratorUserId {
      get;
      set;
    }

    public Group Group {
      get;
      set;
    }
  }
}