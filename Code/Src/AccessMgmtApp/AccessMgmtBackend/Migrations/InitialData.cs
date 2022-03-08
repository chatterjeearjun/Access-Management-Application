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
                    id= 0,
    company_id = 1,
    emp_guid = "6c0276ec-fea1-4fa8-bb1f-5d428a850214",
    emp_designation = "Team Lead",
    emp_first_name = "Arjun",
    emp_last_name = "Chatterjee",
    emp_email = "arjun.chatterjee@gmail.com",
    emp_office_phone = "7047338810",
    emp_mobile_number = "8050633895",
    emp_dob = Convert.ToDateTime("2022-03-07"),
    emp_joining_date = Convert.ToDateTime("2022-03-07"),
    emp_relieving_date = Convert.ToDateTime("2022-03-07"),
    is_active = true,
    created_date = Convert.ToDateTime("2022-03-07"),
    created_by = "Application",
    modified_date = Convert.ToDateTime("2022-03-07"),
    modified_by = "Application"
                });                

                dbContext.SaveChanges();
            }

            if (!dbContext.Groups.Any())
            {
                dbContext.Groups.Add(new Group
                {
                    id = 0,
                    company_id = 1,
                    group_name = "L1",
                    is_active = true,
                    created_date = Convert.ToDateTime("2022-03-07"),
                    created_by = "Application",
                    modified_date = Convert.ToDateTime("2022-03-07"),
                    modified_by = "Application"
                });
                dbContext.Groups.Add(new Group
                {
                    id = 0,
                    company_id = 1,
                    group_name = "L2",
                    is_active = true,
                    created_date = Convert.ToDateTime("2022-03-07"),
                    created_by = "Application",
                    modified_date = Convert.ToDateTime("2022-03-07"),
                    modified_by = "Application"
                });
                dbContext.Groups.Add(new Group
                {
                    id = 0,
                    company_id = 1,
                    group_name = "L3",
                    is_active = true,
                    created_date = Convert.ToDateTime("2022-03-07"),
                    created_by = "Application",
                    modified_date = Convert.ToDateTime("2022-03-07"),
                    modified_by = "Application"
                });

                dbContext.SaveChanges();
            }
        }
    }
}
