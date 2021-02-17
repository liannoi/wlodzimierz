using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Notifications.API.Core.Interfaces;
using Domain.API.Common.Notifications.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.EntityFramework.API.Context
{
    public abstract class NotifiableContext<TChild> : DbContext where TChild : DbContext
    {
        private readonly INotificationService _notificationService;

        public NotifiableContext(DbContextOptions<TChild> options, INotificationService notificationService) :
            base(options)
        {
            _notificationService = notificationService;
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
                    .FirstOrDefault(domainEvent => !domainEvent.IsPublished);

                if (notification == null) break;

                notification.IsPublished = true;
                await _notificationService.Publish(notification);
            }
        }
    }
}