#nullable disable

namespace Domain.API.Entities
{
    public class GroupBlacklist
    {
        public int GroupBlacklistId { get; set; }
        public int GroupId { get; set; }
        public string BlockedUserId { get; set; }
        public bool IsRemoved { get; set; }

        public Group Group { get; set; }
    }
}