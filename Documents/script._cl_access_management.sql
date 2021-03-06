/****** Object:  Database [cl_access_management]    Script Date: 2/16/2022 6:38:32 PM ******/
CREATE DATABASE [cl_access_management]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'cl_access_management', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\cl_access_management.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'cl_access_management_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\cl_access_management_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [cl_access_management] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [cl_access_management].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [cl_access_management] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [cl_access_management] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [cl_access_management] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [cl_access_management] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [cl_access_management] SET ARITHABORT OFF 
GO
ALTER DATABASE [cl_access_management] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [cl_access_management] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [cl_access_management] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [cl_access_management] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [cl_access_management] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [cl_access_management] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [cl_access_management] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [cl_access_management] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [cl_access_management] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [cl_access_management] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [cl_access_management] SET  DISABLE_BROKER 
GO
ALTER DATABASE [cl_access_management] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [cl_access_management] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [cl_access_management] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [cl_access_management] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [cl_access_management] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [cl_access_management] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [cl_access_management] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [cl_access_management] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [cl_access_management] SET  MULTI_USER 
GO
ALTER DATABASE [cl_access_management] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [cl_access_management] SET DB_CHAINING OFF 
GO
ALTER DATABASE [cl_access_management] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [cl_access_management] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
/****** Object:  Table [dbo].[__MigrationHistory]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[__MigrationHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ContextKey] [nvarchar](300) NOT NULL,
	[Model] [varbinary](max) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK_dbo.__MigrationHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC,
	[ContextKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ac_companies]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ac_companies](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[company_guid] [varchar](100) NULL,
	[company_name] [varchar](100) NULL,
	[company_email] [varchar](150) NULL,
	[company_email2] [varchar](150) NULL,
	[company_phone] [varchar](50) NULL,
	[company_country] [varchar](50) NULL,
	[company_city] [varchar](50) NULL,
	[company_postal_code] [varchar](50) NULL,
	[company_address] [varchar](200) NULL,
	[company_activation_date] [datetime] NULL,
	[company_deactivation_date] [datetime] NULL,
	[is_active] [bit] NULL,
	[created_date] [datetime] NULL,
	[created_by] [varchar](50) NULL,
	[modified_date] [datetime] NULL,
	[modified_by] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ac_employees]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ac_employees](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[company_id] [int] NOT NULL,
	[emp_guid] [varchar](100) NULL,
	[emp_role] [varchar](50) NULL,
	[emp_first_name] [varchar](100) NULL,
	[emp_last_name] [varchar](100) NULL,
	[emp_email] [varchar](150) NULL,
	[emp_office_phone] [varchar](50) NULL,
	[emp_mobile_number] [varchar](50) NULL,
	[emp_dob] [datetime] NULL,
	[emp_joining_date] [datetime] NULL,
	[emp_relieving_date] [datetime] NULL,
	[is_active] [bit] NULL,
	[created_date] [datetime] NULL,
	[created_by] [varchar](50) NULL,
	[modified_date] [datetime] NULL,
	[modified_by] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ac_new_joiner_checklist]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ac_new_joiner_checklist](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[company_id] [int] NOT NULL,
	[resume] [bit] NULL,
	[photo] [bit] NULL,
	[nda] [bit] NULL,
	[prev_company_relieving_letter] [bit] NULL,
	[offer_letter_signed] [bit] NULL,
	[educational_certificates] [bit] NULL,
	[home_address] [bit] NULL,
	[nominee_details] [bit] NULL,
	[mobile_number] [bit] NULL,
	[created_date] [datetime] NULL,
	[created_by] [bit] NULL,
	[modified_date] [datetime] NULL,
	[modified_by] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ac_notification_types]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ac_notification_types](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[notification_name] [varchar](100) NULL,
	[notification_subject] [varchar](1000) NULL,
	[notification_body] [varchar](max) NULL,
	[is_active] [bit] NULL,
	[is_manual] [bit] NULL,
	[created_date] [datetime] NULL,
	[created_by] [varchar](50) NULL,
	[modified_date] [datetime] NULL,
	[modified_by] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ac_notifications_sent]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ac_notifications_sent](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[company_id] [int] NULL,
	[notification_type_id] [int] NULL,
	[sent_date] [datetime] NULL,
	[notification_sent_to] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[created_by] [varchar](50) NULL,
	[modified_date] [datetime] NULL,
	[modified_by] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ac_packages]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ac_packages](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[package_guid] [varchar](100) NULL,
	[package_term_in_months] [int] NOT NULL,
	[package_name] [varchar](100) NOT NULL,
	[package_description] [varchar](1000) NOT NULL,
	[tax_rate_percentage] [decimal](5, 3) NOT NULL,
	[original_purchase_fee] [decimal](7, 3) NOT NULL,
	[package_start_date] [datetime] NULL,
	[package_end_date] [datetime] NULL,
	[min_employee_count] [int] NULL,
	[max_employee_count] [int] NULL,
	[is_active] [bit] NULL,
	[created_date] [datetime] NULL,
	[created_by] [varchar](50) NULL,
	[modified_date] [datetime] NULL,
	[modified_by] [varchar](50) NULL,
	[new_offer_fee] [decimal](7, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ac_relieving_checklist]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ac_relieving_checklist](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[company_id] [int] NOT NULL,
	[access_revoked] [bit] NULL,
	[assets_submitted] [bit] NULL,
	[transition_completed] [bit] NULL,
	[hr_discussion_completed] [bit] NULL,
	[feedback_provided] [bit] NULL,
	[finance_clearence_completed] [bit] NULL,
	[it_clearence_completed] [bit] NULL,
	[hr_clearence_completed] [bit] NULL,
	[created_date] [datetime] NULL,
	[created_by] [bit] NULL,
	[modified_date] [datetime] NULL,
	[modified_by] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ac_users]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ac_users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[company_id] [int] NOT NULL,
	[user_guid] [varchar](100) NULL,
	[user_role] [varchar](50) NULL,
	[user_first_name] [varchar](100) NULL,
	[user_last_name] [varchar](100) NULL,
	[user_email] [varchar](150) NULL,
	[user_office_phone] [varchar](50) NULL,
	[user_mobile_number] [varchar](50) NULL,
	[is_active] [bit] NULL,
	[created_date] [datetime] NULL,
	[created_by] [varchar](50) NULL,
	[modified_date] [datetime] NULL,
	[modified_by] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](128) NOT NULL,
	[RoleId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 2/16/2022 6:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](128) NOT NULL,
	[Email] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEndDateUtc] [datetime] NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[UserName] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId]
GO
ALTER DATABASE [cl_access_management] SET  READ_WRITE 
GO
