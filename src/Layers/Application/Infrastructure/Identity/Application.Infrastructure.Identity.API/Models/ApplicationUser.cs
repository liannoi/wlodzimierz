using System.Collections.Generic;
using Domain.API.Common.Notifications;
using Microsoft.AspNetCore.Identity;

namespace Application.Infrastructure.Identity.API.Models
{
    public class ApplicationUser : IdentityUser, INotifiable
    {
        public IList<AbstractNotification> Notifications { get; set; } = new List<AbstractNotification>();
    }
}