using Domain.API.Common.Notifications.Abstractions;
using MediatR;

namespace Application.Infrastructure.Notifications.API.Common
{
    public class WrapperNotification<TNotification> : INotification where TNotification : BaseNotification
    {
        public WrapperNotification(TNotification notification)
        {
            Notification = notification;
        }

        public TNotification Notification { get; }
    }
}