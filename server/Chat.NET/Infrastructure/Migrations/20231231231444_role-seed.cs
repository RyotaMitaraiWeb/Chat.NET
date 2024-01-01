using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class roleseed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("2a200a98-c73e-4426-8cdc-3cbde28c7877"), "92eb131c-f1c9-4d50-af96-1070b906c8fa", "Chat Moderator", "CHAT MODERATOR" },
                    { new Guid("6448a395-d249-4aef-bf74-9cdeeba69f33"), "885d9b50-dc24-4cd8-9102-0df14b5df2a8", "Moderator", "MODERATOR" },
                    { new Guid("90f00fd4-9966-4819-aa58-98836f0e0ddf"), "e98ea9b9-9bb2-414e-a716-7eb6e71fc648", "Administrator", "ADMINISTRATOR" },
                    { new Guid("cace07a2-930c-4029-9465-019d78edcf68"), "8fcee5fd-8774-4637-840c-2eb9741c1c19", "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("2a200a98-c73e-4426-8cdc-3cbde28c7877"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("6448a395-d249-4aef-bf74-9cdeeba69f33"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("90f00fd4-9966-4819-aa58-98836f0e0ddf"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("cace07a2-930c-4029-9465-019d78edcf68"));
        }
    }
}
