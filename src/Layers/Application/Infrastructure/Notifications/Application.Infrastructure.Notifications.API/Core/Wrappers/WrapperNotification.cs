using Domain.API.Common.Notifications.Abstractions;
using MediatR;

namespace Application.Infrastructure.Notifications.API.Core.Wrappers
{
    public class WrapperNotification<TNotification> : INotification where TNotification : AbstractNotification
    {
        public WrapperNotification(TNotification notification)
        {
            Notification = notification;
        }

        public TNotification Notification { get; }
    }
}