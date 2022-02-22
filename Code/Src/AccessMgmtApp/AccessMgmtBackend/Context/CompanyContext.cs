namespace AccessMgmtBackend.Context
{
    using Microsoft.EntityFrameworkCore;
    using AccessMgmtBackend.Models;

    public class CompanyContext
        : DbContext
    {
        public CompanyContext(DbContextOptions options)
            : base(options)
        {

        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<JoinerChecklist> JoinerChecklists { get; set; }
        public DbSet<NotificationType> NotificationTypes { get; set; }
        public DbSet<SentNotification> SentNotifications { get; set; }

    }
}
