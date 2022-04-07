using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccessMgmtBackend.Migrations
{
    public partial class v19 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_user",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_uploaded_file",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_role_user",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_role",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_notifications_sent",
                type: "bit",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "is_active",
                table: "ac_notification_types",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_notification_types",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "ac_new_joiner_checklist",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_group_user",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_group_role",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_group",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_employees",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_employee_role",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_employee_group",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_companies",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_assets",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_asset_user",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_asset_role",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_asset_employee",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_approvers",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_approved",
                table: "ac_approver_role",
                type: "bit",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_user");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_uploaded_file");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_role_user");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_role");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_notifications_sent");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_notification_types");

            migrationBuilder.DropColumn(
                name: "is_active",
                table: "ac_new_joiner_checklist");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_group_user");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_group_role");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_group");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_employees");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_employee_role");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_employee_group");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_companies");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_assets");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_asset_user");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_asset_role");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_asset_employee");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_approvers");

            migrationBuilder.DropColumn(
                name: "is_approved",
                table: "ac_approver_role");

            migrationBuilder.AlterColumn<bool>(
                name: "is_active",
                table: "ac_notification_types",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");
        }
    }
}
