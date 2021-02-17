using System.Collections.Generic;
using Domain.API.Common.Notifications;

#nullable disable

namespace Domain.API.Entities
{
    public class Contact : INotifiable
    {
        public int ContactId { get; set; }
        public string OwnerUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Photo { get; set; }
        public bool IsRemoved { get; set; }

        public IList<AbstractNotification> Notifications { get; set; } = new List<AbstractNotification>();
    }
}