using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Repositories.Map
{
    public class UserMap : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasMany(x => x.CriminalCodes)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.CreateUserId);

            builder.HasMany(x => x.CriminalCodes)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UpdateUserId);
        }
    }
}
