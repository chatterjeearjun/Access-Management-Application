using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccessMgmtBackend.Migrations
{
    public partial class v2804 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ac_ticket_comments",
                columns: table => new
                {
                    comment_identifier = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ticket_identifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    comment_content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    comment_html = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    comment_user_guid = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_ticket_comments", x => x.comment_identifier);
                });

            migrationBuilder.CreateTable(
                name: "ac_ticket_status",
                columns: table => new
                {
                    status_identifier = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    company_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status_value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_ticket_status", x => x.status_identifier);
                });

            migrationBuilder.CreateTable(
                name: "ac_tickets",
                columns: table => new
                {
                    ticket_identifier = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    company_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ticket_subject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ticket_content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ticket_html = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ticket_status = table.Column<int>(type: "int", nullable: true),
                    ticket_user_guid = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ticket_agent_guid = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ticket_completed_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_tickets", x => x.ticket_identifier);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ac_ticket_comments");

            migrationBuilder.DropTable(
                name: "ac_ticket_status");

            migrationBuilder.DropTable(
                name: "ac_tickets");
        }
    }
}
