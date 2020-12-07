using Domain.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.API.Persistence.Configurations {
  public class UserBlacklistConfiguration
      : IEntityTypeConfiguration<UserBlacklist> {
    public void Configure(EntityTypeBuilder<UserBlacklist> builder) {
      builder.HasKey(e => new {e.OwnerUserId, e.BlockedUserId});
    }
  }
}
