namespace AccessMgmtBackend.Context
{
    using Microsoft.EntityFrameworkCore;
    using AccessMgmtBackend.Models;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using AccessMgmtBackend.Data.Entities;

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

    }
}
