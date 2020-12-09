using System.Threading;
using System.Threading.Tasks;
using Domain.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.API.Common.Infrastructure.Persistence.Interfaces
{
    public interface IWlodzimierzContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public DbSet<Conversation> Conversations { get; set; }

        public DbSet<ConversationMessage> ConversationMessages { get; set; }

        public DbSet<Group> Groups { get; set; }

        public DbSet<GroupAdministrator> GroupAdministrators { get; set; }

        public DbSet<GroupBlacklist> GroupBlacklists { get; set; }

        public DbSet<GroupMessage> GroupMessages { get; set; }

        public DbSet<UserBlacklist> UserBlacklists { get; set; }

        public DbSet<UserGroup> UserGroups { get; set; }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}