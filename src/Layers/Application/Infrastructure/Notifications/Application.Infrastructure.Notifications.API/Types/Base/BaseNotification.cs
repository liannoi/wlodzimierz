using Domain.API.Common.Notifications;
using MediatR;

namespace Application.Infrastructure.Notifications.API.Types.Base
{
    public class BaseNotification<TNotification> : INotification where TNotification : AbstractNotification
    {
        public BaseNotification(TNotification notification)
        {
            Notification = notification;
        }

        public TNotification Notification { get; }
    }
}