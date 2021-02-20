using System;

namespace Domain.API.Common.Notifications.Abstractions
{
    public class BaseNotification
    {
        public BaseNotification()
        {
            DateOccurred = DateTime.UtcNow;
        }

        public bool IsPublished { get; set; }
        public DateTimeOffset DateOccurred { get; }
    }
}