using System.Collections.Generic;

namespace Domain.API.Common.Notifications
{
    public interface INotifiable
    {
        IList<AbstractNotification> Notifications { get; }
    }
}