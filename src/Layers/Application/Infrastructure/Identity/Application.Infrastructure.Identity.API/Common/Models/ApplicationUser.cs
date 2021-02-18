using System.Collections.Generic;
using Domain.API.Common.Notifications.Abstractions;
using Domain.API.Common.Notifications.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.Infrastructure.Identity.API.Common.Models
{
    public class ApplicationUser : IdentityUser, INotifiable
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Photo { get; set; }

        public IList<BaseNotification> Notifications { get; set; } = new List<BaseNotification>();
    }
}