using System.Collections.Generic;
using Domain.API.Common.Notifications.Abstractions;
using Domain.API.Common.Notifications.Interfaces;

#nullable disable

namespace Domain.API.Entities
{
    public class Contact : INotifiable
    {
        public int ContactId { get; set; }
        public string OwnerUserId { get; set; }
        public string ContactUserId { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        public string Email { get; set; }
        public string? Photo { get; set; }
        public bool IsRemoved { get; set; }

        public IList<BaseNotification> Notifications { get; set; } = new List<BaseNotification>();
    }
}