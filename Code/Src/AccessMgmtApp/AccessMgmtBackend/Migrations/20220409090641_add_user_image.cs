using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccessMgmtBackend.Migrations
{
    public partial class add_user_image : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "emp_profile_picture",
                table: "ac_user",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "emp_profile_picture",
                table: "ac_user");
        }
    }
}
