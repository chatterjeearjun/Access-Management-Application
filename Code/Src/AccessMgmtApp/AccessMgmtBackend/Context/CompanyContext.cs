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
    }
}
