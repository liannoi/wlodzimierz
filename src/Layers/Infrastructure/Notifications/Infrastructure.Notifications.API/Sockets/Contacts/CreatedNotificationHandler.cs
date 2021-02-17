using Application.Infrastructure.Notifications.API.Core.Interfaces;
using Domain.API.Notifications.Contacts;
using Infrastructure.Notifications.API.Core.Sockets;
using Infrastructure.Notifications.API.Services;
using Microsoft.AspNetCore.SignalR;

namespace Infrastructure.Notifications.API.Sockets.Contacts
{
    public class CreatedNotificationHandler : SocketNotificationHandler<CreatedNotification>
    {
        public CreatedNotificationHandler(IHubContext<NotificationService, INotificationService> notificationService) :
            base(notificationService)
        {
        }
    }
}