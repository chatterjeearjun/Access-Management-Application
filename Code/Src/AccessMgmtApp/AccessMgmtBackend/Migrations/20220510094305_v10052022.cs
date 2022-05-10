using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccessMgmtBackend.Migrations
{
    public partial class v10052022 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ac_company_settings",
                columns: table => new
                {
                    setting_identifier = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    company_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    setting_key = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    setting_value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_company_settings", x => x.setting_identifier);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ac_company_settings");
        }
    }
}
