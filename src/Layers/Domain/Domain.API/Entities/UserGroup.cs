#nullable disable

namespace Domain.API.Entities
{
    public class UserGroup
    {
        public int GroupId { get; set; }
        public int UserId { get; set; }

        public Group Group { get; set; }
    }
}