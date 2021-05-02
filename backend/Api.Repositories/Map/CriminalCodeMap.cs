using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Repositories.Map
{
    public class CriminalCodeMap : IEntityTypeConfiguration<CriminalCode>
    {
        public void Configure(EntityTypeBuilder<CriminalCode> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}
