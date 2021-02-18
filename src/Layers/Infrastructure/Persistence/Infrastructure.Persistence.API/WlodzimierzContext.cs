using System.Reflection;
using Application.Infrastructure.Notifications.API.Sockets;
using Application.Infrastructure.Persistence.API.Interfaces;
using Domain.API.Entities;
using Infrastructure.EntityFramework.API.Context;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Infrastructure.Persistence.API
{
    public class WlodzimierzContext : NotifiableContext<WlodzimierzContext>, IWlodzimierzContext
    {
        public WlodzimierzContext(DbContextOptions<WlodzimierzContext> options,
            INotificationPublisher notificationPublisher) : base(options, notificationPublisher)
        {
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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }
    }
}