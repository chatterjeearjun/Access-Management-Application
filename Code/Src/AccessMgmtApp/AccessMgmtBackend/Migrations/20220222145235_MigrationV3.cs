using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccessMgmtBackend.Migrations
{
    public partial class MigrationV3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ac_companies",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    company_guid = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_email2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_city = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_postal_code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_activation_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    company_deactivation_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_companies", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ac_new_joiner_checklist",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    company_id = table.Column<int>(type: "int", nullable: false),
                    resume = table.Column<bool>(type: "bit", nullable: true),
                    photo = table.Column<bool>(type: "bit", nullable: true),
                    nda = table.Column<bool>(type: "bit", nullable: true),
                    prev_company_relieving_letter = table.Column<bool>(type: "bit", nullable: true),
                    offer_letter_signed = table.Column<bool>(type: "bit", nullable: true),
                    educational_certificates = table.Column<bool>(type: "bit", nullable: true),
                    home_address = table.Column<bool>(type: "bit", nullable: true),
                    nominee_details = table.Column<bool>(type: "bit", nullable: true),
                    mobile_number = table.Column<bool>(type: "bit", nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<bool>(type: "bit", nullable: true),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_new_joiner_checklist", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ac_notification_types",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    notification_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    notification_subject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    notification_body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: true),
                    is_manual = table.Column<bool>(type: "bit", nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_notification_types", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ac_notifications_sent",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    company_id = table.Column<int>(type: "int", nullable: true),
                    notification_type_id = table.Column<int>(type: "int", nullable: true),
                    sent_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    notification_sent_to = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_notifications_sent", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ac_companies");

            migrationBuilder.DropTable(
                name: "ac_new_joiner_checklist");

            migrationBuilder.DropTable(
                name: "ac_notification_types");

            migrationBuilder.DropTable(
                name: "ac_notifications_sent");
        }
    }
}
