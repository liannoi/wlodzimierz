using Domain.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.API.Configurations
{
    public class GroupBlacklistConfiguration : IEntityTypeConfiguration<GroupBlacklist>
    {
        public void Configure(EntityTypeBuilder<GroupBlacklist> builder)
        {
            builder.Property(e => e.BlockedUserId).IsRequired().HasMaxLength(450);

            builder.HasOne(d => d.Group)
                .WithMany(p => p.GroupBlacklists)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GroupBlacklists_GroupId");
        }
    }
}