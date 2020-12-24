using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Notifications.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Domain.API.Common.Notifications;
using Domain.API.Entities;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Infrastructure.Persistence.API
{
    public class WlodzimierzContext : DbContext, IWlodzimierzContext
    {
        private readonly INotificationService _notificationService;

        public WlodzimierzContext(DbContextOptions<WlodzimierzContext> options,
            INotificationService notificationService)
            : base(options)
        {
            _notificationService = notificationService;
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<ConversationMessage> ConversationMessages { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupAdministrator> GroupAdministrators { get; set; }
        public DbSet<GroupBlacklist> GroupBlacklists { get; set; }
        public DbSet<GroupMessage> GroupMessages { get; set; }
        public DbSet<UserBlacklist> UserBlacklists { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new())
        {
            var result = await base.SaveChangesAsync(cancellationToken);
            await DispatchEvents();

            return result;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
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