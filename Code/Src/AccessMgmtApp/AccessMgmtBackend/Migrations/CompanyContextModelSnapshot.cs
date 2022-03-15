﻿// <auto-generated />
using System;
using AccessMgmtBackend.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AccessMgmtBackend.Migrations
{
    [DbContext(typeof(CompanyContext))]
    partial class CompanyContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("AccessMgmtBackend.Data.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("AccessMgmtBackend.Models.Approver", b =>
                {
                    b.Property<Guid>("approver_identifier")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("approver_email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("approver_first_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("approver_last_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("approver_mobile_number")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("approver_office_phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("approver_role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("company_identifier")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("created_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("created_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<bool>("is_active")
                        .HasColumnType("bit");

                    b.Property<string>("modified_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("modified_date")
                        .HasColumnType("datetime2");

                    b.HasKey("approver_identifier");

                    b.ToTable("ac_approvers");
                });

            modelBuilder.Entity("AccessMgmtBackend.Models.AppUser", b =>
                {
                    b.Property<Guid>("user_identifier")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("company_identifier")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("created_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("created_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<bool>("is_active")
                        .HasColumnType("bit");

                    b.Property<bool?>("is_bc_required")
                        .HasColumnType("bit");

                    b.Property<bool?>("is_certification_required")
                        .HasColumnType("bit");

                    b.Property<bool?>("is_mda_required")
                        .HasColumnType("bit");

                    b.Property<string>("modified_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("modified_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("user_description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("user_description_attachment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("user_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("user_identifier");

                    b.ToTable("ac_user");
                });

            modelBuilder.Entity("AccessMgmtBackend.Models.Asset", b =>
                {
                    b.Property<Guid>("asset_identifier")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("alocation_end_date")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("alocation_start_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("asset_description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("asset_description_attachment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("asset_id")
                        .HasColumnType("int");

                    b.Property<string>("asset_location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("asset_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("asset_owner")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("asset_risk_ranking")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("asset_type")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("certification_required")
                        .HasColumnType("bit");

                    b.Property<string>("company_identifier")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("created_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("created_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<bool>("is_active")
                        .HasColumnType("bit");

                    b.Property<bool?>("is_bc_required")
                        .HasColumnType("bit");

                    b.Property<bool?>("is_mda_required")
                        .HasColumnType("bit");

                    b.Property<string>("modified_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("modified_date")
                        .HasColumnType("datetime2");

                    b.HasKey("asset_identifier");

                    b.ToTable("ac_assets");
                });

            modelBuilder.Entity("AccessMgmtBackend.Models.Company", b =>
                {
                    b.Property<Guid>("company_identifier")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("company_activation_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("company_address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("company_city")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("company_country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("company_deactivation_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("company_email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("company_email2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("company_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("company_phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("company_postal_code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("created_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("created_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<bool>("is_active")
                        .HasColumnType("bit");

                    b.Property<string>("modified_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("modified_date")
                        .HasColumnType("datetime2");

                    b.HasKey("company_identifier");

                    b.ToTable("ac_companies");
                });

            modelBuilder.Entity("AccessMgmtBackend.Models.Employee", b =>
                {
                    b.Property<Guid>("employee_identifier")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("company_identifier")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("created_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("created_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("emp_bc_document1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emp_bc_document2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emp_bc_document3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emp_bc_document4")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("emp_bc_review_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("emp_cert_document1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emp_cert_document2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emp_cert_document3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emp_cert_document4")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("emp_cert_review_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("emp_designation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("emp_dob")
                        .HasColumnType("datetime2");

                    b.Property<string>("emp_email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emp_first_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("emp_joining_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("emp_last_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emp_mobile_number")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emp_nda_document1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emp_nda_document2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emp_nda_document3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emp_nda_document4")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("emp_nda_review_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("emp_office_phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("emp_relieving_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("emp_role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<bool>("is_active")
                        .HasColumnType("bit");

                    b.Property<string>("modified_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("modified_date")
                        .HasColumnType("datetime2");

                    b.HasKey("employee_identifier");

                    b.ToTable("ac_employees");
                });

            modelBuilder.Entity("AccessMgmtBackend.Models.Group", b =>
                {
                    b.Property<Guid>("group_identifier")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("company_identifier")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("created_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("created_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("group_description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("group_description_attachment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("group_end_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("group_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("group_start_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<bool>("is_active")
                        .HasColumnType("bit");

                    b.Property<bool?>("is_bc_required")
                        .HasColumnType("bit");

                    b.Property<bool?>("is_certification_required")
                        .HasColumnType("bit");

                    b.Property<bool?>("is_mda_required")
                        .HasColumnType("bit");

                    b.Property<string>("modified_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("modified_date")
                        .HasColumnType("datetime2");

                    b.HasKey("group_identifier");

                    b.ToTable("ac_group");
                });

            modelBuilder.Entity("AccessMgmtBackend.Models.JoinerChecklist", b =>
                {
                    b.Property<Guid>("checklist_identifier")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("checklist_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("company_identifier")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("created_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("created_date")
                        .HasColumnType("datetime2");

                    b.Property<bool?>("educational_certificates")
                        .HasColumnType("bit");

                    b.Property<bool?>("home_address")
                        .HasColumnType("bit");

                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<bool?>("mobile_number")
                        .HasColumnType("bit");

                    b.Property<string>("modified_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("modified_date")
                        .HasColumnType("datetime2");

                    b.Property<bool?>("nda")
                        .HasColumnType("bit");

                    b.Property<bool?>("nominee_details")
                        .HasColumnType("bit");

                    b.Property<bool?>("offer_letter_signed")
                        .HasColumnType("bit");

                    b.Property<bool?>("photo")
                        .HasColumnType("bit");

                    b.Property<bool?>("prev_company_relieving_letter")
                        .HasColumnType("bit");

                    b.Property<bool?>("resume")
                        .HasColumnType("bit");

                    b.HasKey("checklist_identifier");

                    b.ToTable("ac_new_joiner_checklist");
                });

            modelBuilder.Entity("AccessMgmtBackend.Models.NotificationType", b =>
                {
                    b.Property<Guid>("notification_identifier")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("company_identifier")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("created_by")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("created_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<bool?>("is_active")
                        .HasColumnType("bit");

                    b.Property<bool?>("is_manual")
                        .HasColumnType("bit");

                    b.Property<string>("modified_by")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("modified_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("notification_body")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("notification_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("notification_subject")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("notification_identifier");

                    b.ToTable("ac_notification_types");
                });

            modelBuilder.Entity("AccessMgmtBackend.Models.Role", b =>
                {
                    b.Property<Guid>("role_identifier")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("company_identifier")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("created_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("created_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<bool>("is_active")
                        .HasColumnType("bit");

                    b.Property<bool?>("is_bc_required")
                        .HasColumnType("bit");

                    b.Property<bool?>("is_certification_required")
                        .HasColumnType("bit");

                    b.Property<bool?>("is_mda_required")
                        .HasColumnType("bit");

                    b.Property<string>("modified_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("modified_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("role_description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("role_description_attachment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("role_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("role_identifier");

                    b.ToTable("ac_role");
                });

            modelBuilder.Entity("AccessMgmtBackend.Models.SentNotification", b =>
                {
                    b.Property<Guid>("notification_sent_identifier")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("company_identifier")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("created_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("created_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<bool>("is_active")
                        .HasColumnType("bit");

                    b.Property<string>("modified_by")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("modified_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("notification_sent_to")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("notification_type_id")
                        .HasColumnType("int");

                    b.Property<DateTime?>("sent_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("sent_notification_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("notification_sent_identifier");

                    b.ToTable("ac_notifications_sent");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("AccessMgmtBackend.Data.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("AccessMgmtBackend.Data.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AccessMgmtBackend.Data.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("AccessMgmtBackend.Data.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
