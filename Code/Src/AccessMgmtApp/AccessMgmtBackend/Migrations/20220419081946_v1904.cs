using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccessMgmtBackend.Migrations
{
    public partial class v1904 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_bc_required",
                table: "ac_role");

            migrationBuilder.DropColumn(
                name: "is_certification_required",
                table: "ac_role");

            migrationBuilder.DropColumn(
                name: "is_nda_required",
                table: "ac_role");

            migrationBuilder.RenameColumn(
                name: "role_description_attachment",
                table: "ac_role",
                newName: "associated_documents");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "associated_documents",
                table: "ac_role",
                newName: "role_description_attachment");

            migrationBuilder.AddColumn<bool>(
                name: "is_bc_required",
                table: "ac_role",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_certification_required",
                table: "ac_role",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_nda_required",
                table: "ac_role",
                type: "bit",
                nullable: true);
        }
    }
}
