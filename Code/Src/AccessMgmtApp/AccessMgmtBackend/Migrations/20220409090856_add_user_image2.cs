using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccessMgmtBackend.Migrations
{
    public partial class add_user_image2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "emp_profile_picture",
                table: "ac_user",
                newName: "user_profile_picture");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "user_profile_picture",
                table: "ac_user",
                newName: "emp_profile_picture");
        }
    }
}
