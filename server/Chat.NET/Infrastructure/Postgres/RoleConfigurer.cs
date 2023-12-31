﻿using Common.Authentication;
using Infrastructure.Postgres.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Postgres
{
    public class RoleConfigurer : IEntityTypeConfiguration<ApplicationRole>
    {
        public void Configure(EntityTypeBuilder<ApplicationRole> builder)
        {
            builder.HasData
            (
                new ApplicationRole()
                {
                    Id = new Guid("CACE07A2-930C-4029-9465-019D78EDCF68"),
                    Name = Roles.User,
                    NormalizedName = Roles.User.ToUpper(),
                    ConcurrencyStamp = "8fcee5fd-8774-4637-840c-2eb9741c1c19"
                },
                new ApplicationRole()
                {
                    Id = new Guid("90F00FD4-9966-4819-AA58-98836F0E0DDF"),
                    Name = Roles.Admin,
                    NormalizedName = Roles.Admin.ToUpper(),
                    ConcurrencyStamp = "e98ea9b9-9bb2-414e-a716-7eb6e71fc648",
                },
                new ApplicationRole()
                {
                    Id = new Guid("6448A395-D249-4AEF-BF74-9CDEEBA69F33"),
                    Name = Roles.Moderator,
                    NormalizedName = Roles.Moderator.ToUpper(),
                    ConcurrencyStamp = "885d9b50-dc24-4cd8-9102-0df14b5df2a8",
                },
                new ApplicationRole()
                {
                    Id = new Guid("2a200a98-c73e-4426-8cdc-3cbde28c7877"),
                    Name = Roles.ChatModerator,
                    NormalizedName = Roles.ChatModerator.ToUpper(),
                    ConcurrencyStamp = "92eb131c-f1c9-4d50-af96-1070b906c8fa",
                }
            );
        }
    }
}
