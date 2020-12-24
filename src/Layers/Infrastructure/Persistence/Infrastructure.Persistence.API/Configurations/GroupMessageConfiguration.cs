using Domain.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.API.Configurations
{
    public class GroupMessageConfiguration : IEntityTypeConfiguration<GroupMessage>
    {
        public void Configure(EntityTypeBuilder<GroupMessage> builder)
        {
            builder.Property(e => e.Message).IsRequired().HasMaxLength(1024);
            builder.Property(e => e.OwnerUserId).IsRequired().HasMaxLength(450);
            builder.Property(e => e.Publish).HasColumnType("datetime").HasDefaultValueSql("(getdate())");

            builder.HasOne(d => d.Group)
                .WithMany(p => p.GroupMessages)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GroupMessages_GroupId");
        }
    }
}