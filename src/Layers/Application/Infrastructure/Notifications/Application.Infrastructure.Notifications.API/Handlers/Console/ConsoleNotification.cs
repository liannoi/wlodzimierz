using Domain.API.Common.Notifications;
using MediatR;

namespace Application.Infrastructure.Notifications.API.Handlers.Console
{
    public class ConsoleNotification<TNotification> : INotification where TNotification : AbstractNotification
    {
        public ConsoleNotification(TNotification notification)
        {
            Notification = notification;
        }

        public TNotification Notification { get; }
    }
}