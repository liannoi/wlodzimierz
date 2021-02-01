using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Identity.API.Migrations
{
    public partial class Photo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                "Photo",
                "AspNetUsers",
                "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                "Photo",
                "AspNetUsers");
        }
    }
}