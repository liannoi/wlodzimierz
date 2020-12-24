using Domain.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.API.Configurations
{
    public class ConversationMessageConfiguration : IEntityTypeConfiguration<ConversationMessage>
    {
        public void Configure(EntityTypeBuilder<ConversationMessage> builder)
        {
            builder.Property(e => e.Message).IsRequired().HasMaxLength(1024);
            builder.Property(e => e.OwnerUserId).IsRequired().HasMaxLength(450);
            builder.Property(e => e.Publish).HasColumnType("datetime").HasDefaultValueSql("(getdate())");

            builder.HasOne(d => d.Conversation)
                .WithMany(p => p.ConversationMessages)
                .HasForeignKey(d => d.ConversationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ConversationMessages_ConversationId");
        }
    }
}