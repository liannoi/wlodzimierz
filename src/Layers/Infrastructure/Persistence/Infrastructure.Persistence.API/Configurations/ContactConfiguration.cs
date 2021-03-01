using Domain.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.API.Configurations
{
    public class ContactConfiguration : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.Ignore(e => e.Notifications);
            builder.Property(e => e.Email).IsRequired().HasMaxLength(128);
            builder.Property(e => e.FirstName).IsRequired().HasMaxLength(64);
            builder.Property(e => e.LastName).HasMaxLength(64);
            builder.Property(e => e.OwnerUserId).IsRequired().HasMaxLength(450);
            builder.Property(e => e.ContactUserId).IsRequired().HasMaxLength(450);
            builder.Property(e => e.Photo).HasMaxLength(256);
        }
    }
}