using System.Reflection;
using Application.API.Common.Infrastructure.Persistence;
using Domain.API.Entities;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Infrastructure.API.Persistence
{
    public class WlodzimierzContext : DbContext, IWlodzimierzContext
    {
        public WlodzimierzContext(DbContextOptions<WlodzimierzContext> options) : base(options)
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
            builder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }
    }
}