using Domain.API.Common.Notifications;
using MediatR;

namespace Application.Infrastructure.Notifications.API.Types.EntityChanged
{
    public class EntityChangedNotification<TNotification> : INotification where TNotification : AbstractNotification
    {
        public EntityChangedNotification(TNotification notification)
        {
            Notification = notification;
        }

        public TNotification Notification { get; }
    }
}