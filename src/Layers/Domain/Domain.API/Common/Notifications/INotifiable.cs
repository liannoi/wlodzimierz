using System.Collections.Generic;

namespace Domain.API.Common.Notifications
{
    public interface INotifiable
    {
        public IList<AbstractNotification> Notifications { get; set; }
    }
}