using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccessMgmtBackend.Migrations
{
    public partial class v09052022 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ac_approvers_history",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    approver_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    approver_first_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    approver_last_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    approver_email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    approver_office_phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    approver_mobile_number = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    approver_role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    is_approved = table.Column<bool>(type: "bit", nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    reason = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_approvers_history", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ac_assets_history",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    asset_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    asset_id = table.Column<int>(type: "int", nullable: false),
                    asset_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    asset_owner = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    asset_location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    asset_risk_ranking = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    asset_type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    asset_description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    asset_description_attachment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    is_approved = table.Column<bool>(type: "bit", nullable: true),
                    is_nda_required = table.Column<bool>(type: "bit", nullable: true),
                    is_bc_required = table.Column<bool>(type: "bit", nullable: true),
                    certification_required = table.Column<bool>(type: "bit", nullable: true),
                    alocation_start_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    alocation_end_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    reason = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_assets_history", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ac_employees_history",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    employee_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    emp_role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    emp_group = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    emp_designation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    emp_first_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    emp_last_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    emp_email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    emp_office_phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    emp_mobile_number = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    emp_dob = table.Column<DateTime>(type: "datetime2", nullable: true),
                    emp_joining_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    emp_relieving_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    emp_doc_configitem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    emp_doc_externallink = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    associated_assets = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    emp_profile_picture = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    emp_approval_overdue = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    is_approved = table.Column<bool>(type: "bit", nullable: true),
                    is_rejected = table.Column<bool>(type: "bit", nullable: true),
                    emp_approval_comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    reason = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_employees_history", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ac_roles_history",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    role_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    role_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    role_description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    is_approved = table.Column<bool>(type: "bit", nullable: true),
                    role_description_attachment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    associated_documents = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    associated_assets = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    associated_groups = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    reason = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_roles_history", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ac_tickets_history",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ticket_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    reason = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_tickets_history", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ac_users_history",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    company_identifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    user_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    user_description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    user_description_attachment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    is_approved = table.Column<bool>(type: "bit", nullable: true),
                    is_nda_required = table.Column<bool>(type: "bit", nullable: true),
                    is_bc_required = table.Column<bool>(type: "bit", nullable: true),
                    is_certification_required = table.Column<bool>(type: "bit", nullable: true),
                    associated_assets = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    user_role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    user_group = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    user_profile_picture = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    modified_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    reason = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ac_users_history", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ac_approvers_history");

            migrationBuilder.DropTable(
                name: "ac_assets_history");

            migrationBuilder.DropTable(
                name: "ac_employees_history");

            migrationBuilder.DropTable(
                name: "ac_roles_history");

            migrationBuilder.DropTable(
                name: "ac_tickets_history");

            migrationBuilder.DropTable(
                name: "ac_users_history");
        }
    }
}
