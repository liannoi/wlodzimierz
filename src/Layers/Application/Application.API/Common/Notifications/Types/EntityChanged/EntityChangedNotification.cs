using Domain.API.Common.Notifications;
using MediatR;

namespace Application.API.Common.Notifications.Types.EntityChanged
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public class EntityChangedNotification<TNotification> : INotification where TNotification : AbstractNotification
    {
        public EntityChangedNotification(TNotification notification)
        {
            Notification = notification;
        }

        public TNotification Notification { get; }
    }
}