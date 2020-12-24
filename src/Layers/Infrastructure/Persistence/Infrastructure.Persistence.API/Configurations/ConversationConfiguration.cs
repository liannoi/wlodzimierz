using Domain.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.API.Configurations
{
    public class ConversationConfiguration : IEntityTypeConfiguration<Conversation>
    {
        public void Configure(EntityTypeBuilder<Conversation> builder)
        {
            builder.Property(e => e.LeftUserId).IsRequired().HasMaxLength(450);
            builder.Property(e => e.RightUserId).IsRequired().HasMaxLength(450);
        }
    }
}