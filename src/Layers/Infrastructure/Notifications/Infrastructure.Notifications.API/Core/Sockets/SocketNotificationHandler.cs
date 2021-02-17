using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Notifications.API.Core.Interfaces;
using Application.Infrastructure.Notifications.API.Core.Wrappers;
using Domain.API.Common.Notifications.Abstractions;
using Infrastructure.Notifications.API.Services;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Infrastructure.Notifications.API.Core.Sockets
{
    public abstract class SocketNotificationHandler<TNotification> :
        INotificationHandler<WrapperNotification<TNotification>> where TNotification : AbstractNotification
    {
        private readonly IHubContext<NotificationService, INotificationService> _notificationService;

        protected SocketNotificationHandler(IHubContext<NotificationService, INotificationService> notificationService)
        {
            _notificationService = notificationService;
        }

        public async Task Handle(WrapperNotification<TNotification> notification, CancellationToken cancellationToken)
        {
            await _notificationService.Clients.All.Publish(notification.Notification);
        }
    }
}