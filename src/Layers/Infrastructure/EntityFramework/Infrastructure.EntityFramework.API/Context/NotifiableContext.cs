using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Notifications.API.Sockets;
using Domain.API.Common.Notifications.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.EntityFramework.API.Context
{
    public abstract class NotifiableContext<TChild> : DbContext where TChild : DbContext
    {
        private readonly INotificationPublisher _notificationPublisher;

        public NotifiableContext(DbContextOptions<TChild> options, INotificationPublisher notificationPublisher) :
            base(options)
        {
            _notificationPublisher = notificationPublisher;
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new())
        {
            var result = await base.SaveChangesAsync(cancellationToken);
            await DispatchEvents();

            return result;
        }

        // Helpers.

        private async Task DispatchEvents()
        {
            while (true)
            {
                var notification = ChangeTracker.Entries<INotifiable>()
                    .Select(x => x.Entity.Notifications)
                    .SelectMany(x => x)
                    .FirstOrDefault(baseNotification => !baseNotification.IsPublished);

                if (notification == null) break;

                notification.IsPublished = true;
                await _notificationPublisher.PublishAsync(notification);
            }
        }
    }
}