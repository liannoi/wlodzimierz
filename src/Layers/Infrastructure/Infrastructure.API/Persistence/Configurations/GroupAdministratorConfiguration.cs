using Domain.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.API.Persistence.Configurations
{
public class GroupAdministratorConfiguration : IEntityTypeConfiguration<GroupAdministrator>
{
    public void Configure(EntityTypeBuilder<GroupAdministrator> builder)
    {
        builder.HasKey(e => new {
            e.GroupId, e.AdministratorUserId
        });

        builder.HasOne(d => d.Group)
        .WithMany(p => p.GroupAdministrators)
        .HasForeignKey(d => d.GroupId)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("FK_GroupAdministrators_GroupId");
    }
}
}