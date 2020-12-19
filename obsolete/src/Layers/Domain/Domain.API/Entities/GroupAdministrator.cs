#nullable disable

namespace Domain.API.Entities
{
    public class GroupAdministrator
    {
        public int GroupAdministratorId { get; set; }
        public int GroupId { get; set; }
        public string AdministratorUserId { get; set; }
        public bool IsRemoved { get; set; }

        public Group Group { get; set; }
    }
}