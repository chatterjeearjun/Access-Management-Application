using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;

namespace AccessMgmtBackend.Migrations
{
    public static class InitialData
    {
        public static void Seed(this CompanyContext dbContext)
        {
            if (!dbContext.Employees.Any())
            {
                dbContext.Employees.Add(new Employee
                {
                    emp_first_name = "Employee001",
                    emp_email = "Employee1@gmail.com",
                    emp_guid = Guid.NewGuid().ToString(),
                    company_id = 1,
                    emp_dob = Convert.ToDateTime("01-01-1990"),
                    emp_joining_date = DateTime.Now,
                    emp_relieving_date = DateTime.Now,
                    is_active= true,
                    emp_mobile_number = "1234567892"
                });
                dbContext.Employees.Add(new Employee
                {
                    emp_first_name = "Employee002",
                    emp_email = "Employee2@gmail.com",
                    emp_guid = Guid.NewGuid().ToString(),
                    company_id = 1,
                    emp_dob = Convert.ToDateTime("01-01-1991"),
                    emp_joining_date = DateTime.Now,
                    emp_relieving_date = DateTime.Now,
                    is_active = true,
                    emp_mobile_number ="1234567890"
                });
                dbContext.Employees.Add(new Employee
                {
                    emp_first_name = "Employee003",
                    emp_email = "Employee3@gmail.com",
                    emp_guid = Guid.NewGuid().ToString(),
                    company_id = 1,
                    emp_dob = Convert.ToDateTime("01-01-1992"),
                    emp_joining_date = DateTime.Now,
                    emp_relieving_date = DateTime.Now,
                    is_active = true,
                    emp_mobile_number = "1234567891"
                });

                dbContext.SaveChanges();
            }
        }
    }
}
