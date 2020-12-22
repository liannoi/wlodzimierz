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

        // ReSharper disable once AutoPropertyCanBeMadeGetOnly.Global
        // ReSharper disable once MemberCanBePrivate.Global
        // ReSharper disable once UnusedAutoPropertyAccessor.Global
        public DateTimeOffset DateOccurred { get; protected set; }
    }
}