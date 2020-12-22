using Domain.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.API.Persistence.Configurations
{
    public class UserBlacklistConfiguration : IEntityTypeConfiguration<UserBlacklist>
    {
        public void Configure(EntityTypeBuilder<UserBlacklist> builder)
        {
            builder.Property(e => e.BlockedUserId).IsRequired().HasMaxLength(450);
            builder.Property(e => e.OwnerUserId).IsRequired().HasMaxLength(450);
        }
    }
}