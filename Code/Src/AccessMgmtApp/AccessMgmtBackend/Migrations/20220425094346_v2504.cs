using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccessMgmtBackend.Migrations
{
    public partial class v2504 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "emp_doc_configitem",
                table: "ac_employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "emp_doc_externallink",
                table: "ac_employees",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "emp_doc_configitem",
                table: "ac_employees");

            migrationBuilder.DropColumn(
                name: "emp_doc_externallink",
                table: "ac_employees");
        }
    }
}
