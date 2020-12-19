using System;

#nullable disable

namespace Domain.API.Entities
{
    public class GroupMessage
    {
        public int GroupMessageId { get; set; }
        public int GroupId { get; set; }
        public string OwnerUserId { get; set; }
        public string Message { get; set; }
        public DateTime Publish { get; set; }
        public bool IsRemoved { get; set; }

        public Group Group { get; set; }
    }
}