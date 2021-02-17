using System;

namespace Domain.API.Common.Notifications
{
    public abstract class AbstractNotification
    {
        protected AbstractNotification()
        {
            DateOccurred = DateTime.UtcNow;
        }

        public bool IsPublished { get; set; }
        public DateTimeOffset DateOccurred { get; }
    }
}