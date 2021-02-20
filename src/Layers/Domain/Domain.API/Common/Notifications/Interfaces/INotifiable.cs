using System.Collections.Generic;
using Domain.API.Common.Notifications.Abstractions;

namespace Domain.API.Common.Notifications.Interfaces
{
    public interface INotifiable
    {
        IList<BaseNotification> Notifications { get; }
    }
}