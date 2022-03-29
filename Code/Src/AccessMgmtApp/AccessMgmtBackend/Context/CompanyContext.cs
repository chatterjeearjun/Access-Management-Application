namespace AccessMgmtBackend.Context
{
    using Microsoft.EntityFrameworkCore;
    using AccessMgmtBackend.Models;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using AccessMgmtBackend.Data.Entities;
    using Microsoft.EntityFrameworkCore.Metadata;
    using AccessMgmtBackend.Models.ApproverModels;

    public class CompanyContext
        : IdentityDbContext<User>
    {
        public CompanyContext(DbContextOptions<CompanyContext> options)
            : base(options)
        {

        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Role> CompanyRoles { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<JoinerChecklist> JoinerChecklists { get; set; }
        public DbSet<NotificationType> NotificationTypes { get; set; }
        public DbSet<SentNotification> SentNotifications { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Approver> Approvers { get; set; }
        public DbSet<UploadedFile> UploadedFiles { get; set; }
        public DbSet<AssetToEmployee> AssetToEmployees { get; set; }
        public DbSet<AssetToRole> AssetToRoles { get; set; }
        public DbSet<AssetToUser> AssetToUsers { get; set; }
        public DbSet<GroupToRole> GroupToRoles { get; set; }
        public DbSet<EmployeeToRole> EmployeeToRoles { get; set; }
        public DbSet<ApproverToRole> ApproverToRoles { get; set; }
        public DbSet<GroupToUser> GroupToUsers { get; set; }
        public DbSet<RoleToUser> RoleToUsers { get; set; }
        public DbSet<EmployeeToGroup> EmployeeToGroups { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // add your own configuration here
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Approver>().Property(u => u.id).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            modelBuilder.Entity<Asset>().Property(u => u.id).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            modelBuilder.Entity<Company>().Property(u => u.id).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            modelBuilder.Entity<Employee>().Property(u => u.id).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            modelBuilder.Entity<Group>().Property(u => u.id).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            modelBuilder.Entity<JoinerChecklist>().Property(u => u.id).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            modelBuilder.Entity<NotificationType>().Property(u => u.id).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            modelBuilder.Entity<Role>().Property(u => u.id).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            modelBuilder.Entity<SentNotification>().Property(u => u.id).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            modelBuilder.Entity<UploadedFile>().Property(u => u.id).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            modelBuilder.Entity<AppUser>().Property(u => u.id).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
        }
    }
}
