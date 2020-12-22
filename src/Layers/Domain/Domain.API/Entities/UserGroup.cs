#nullable disable

namespace Domain.API.Entities
{
    public class UserGroup
    {
        public int GroupId { get; set; }
        public string UserId { get; set; }
        public bool IsRemoved { get; set; }

        public Group Group { get; set; }
    }
}