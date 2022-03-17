using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccessMgmtBackend.Migrations
{
    public partial class v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "associated_assets",
                table: "ac_user",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "associated_assets",
                table: "ac_role",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "associated_assets",
                table: "ac_employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ac_asset_employee",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    company_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    asset_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    employee_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_asset_employee", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ac_asset_role",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    company_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    asset_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    role_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_asset_role", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ac_asset_user",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    company_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    asset_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    user_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_asset_user", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ac_group_role",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    company_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    group_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    role_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_group_role", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ac_asset_employee");

            migrationBuilder.DropTable(
                name: "ac_asset_role");

            migrationBuilder.DropTable(
                name: "ac_asset_user");

            migrationBuilder.DropTable(
                name: "ac_group_role");

            migrationBuilder.DropColumn(
                name: "associated_assets",
                table: "ac_user");

            migrationBuilder.DropColumn(
                name: "associated_assets",
                table: "ac_role");

            migrationBuilder.DropColumn(
                name: "associated_assets",
                table: "ac_employees");
        }
    }
}
