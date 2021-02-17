using System.Threading.Tasks;
using Application.Infrastructure.Notifications.API.Core.Interfaces;
using Domain.API.Common.Notifications.Abstractions;
using Infrastructure.Notifications.API.Core.Wrappers;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Notifications.API.Services
{
    public class NotificationService : Hub<INotificationService>, INotificationService
    {
        private readonly ILogger<NotificationService> _logger;
        private readonly IPublisher _mediator;

        public NotificationService(ILogger<NotificationService> logger, IPublisher mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        public async Task Publish(AbstractNotification notification)
        {
            _logger.LogInformation("Publish notification {Notification}", notification.GetType().Name);
            await _mediator.Publish(notification.Wrap());
            await Clients.All.Publish(notification);
        }
    }
}