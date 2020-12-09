#nullable disable

namespace Domain.API.Entities
{
    public class UserBlacklist
    {
        public int UserBlacklistId { get; set; }
        public string OwnerUserId { get; set; }
        public string BlockedUserId { get; set; }
        public bool IsRemoved { get; set; }
    }
}