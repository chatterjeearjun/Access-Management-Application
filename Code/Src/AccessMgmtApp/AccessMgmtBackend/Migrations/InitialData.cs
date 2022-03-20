using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using AccessMgmtBackend.Models.ApproverModels;

namespace AccessMgmtBackend.Migrations
{
    public static class InitialData
    {
        public static void Seed(this CompanyContext dbContext)
        {
            if (!dbContext.Companies.Any())
            {
                dbContext.Companies.Add(new Company
                {
                    id = 0,
                    company_identifier = new Guid("6c0276ec-fea1-4fa8-bb1f-5d428a850222"),
                    company_name = "Crossleaf",
                    company_email = "crossleaf.ca@gmail.com",
                    company_phone = "1234567890",
                    company_country = "CA",
                    company_city = "Toronto",
                    company_postal_code = "56001",
                    company_address= "Downton,Toronto",
                    company_activation_date = Convert.ToDateTime("2022-03-07"),
                    is_active = true,
                    created_date = Convert.ToDateTime("2022-03-07"),
                    created_by = "Application",
                    modified_date = Convert.ToDateTime("2022-03-07"),
                    modified_by = "Application"
                });

                dbContext.SaveChanges();
            }
            if (!dbContext.Employees.Any())
            {
                dbContext.Employees.Add(new Employee
                {
                    id = 0,
                    company_identifier = "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
                    employee_identifier = new Guid("6c0276ec-fea1-4fa8-bb1f-5d428a850214"),
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
            if (!dbContext.Approvers.Any())
            {
                dbContext.Approvers.Add(new Approver
                {
                    id = 0,
                    company_identifier = "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
                    approver_identifier = new Guid("6c0276ec-fea1-4fa8-bb1f-5d428a850299"),
                    approver_role = "Team Lead",
                    approver_first_name = "Arjun",
                    approver_last_name = "Chatterjee",
                    approver_email = "arjun.chatterjee@gmail.com",
                    approver_mobile_number = "8050633895",                    
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
                    group_identifier= new Guid("6c0276ec-fea1-4fa8-bb1f-5d428a850228"),
                    company_identifier = "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
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
                    group_identifier = new Guid("6c0276ec-fea1-4fa8-bb1f-5d428a850290"),
                    company_identifier = "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
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
                    group_identifier = new Guid("6c0276ec-fea1-4fa8-bb1f-5d428a850201"),
                    company_identifier = "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
                    group_name = "L3",
                    is_active = true,
                    created_date = Convert.ToDateTime("2022-03-07"),
                    created_by = "Application",
                    modified_date = Convert.ToDateTime("2022-03-07"),
                    modified_by = "Application"
                });

                dbContext.SaveChanges();
            }

            if (!dbContext.CompanyRoles.Any())
            {
                dbContext.CompanyRoles.Add(new Role
                {
                    id = 0,
                    role_identifier = new Guid("6c0276ec-fea1-4fa8-bb1f-5d428a820209"),
                    company_identifier = "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
                    role_name = "Administrator",
                    is_active = true,
                    created_date = Convert.ToDateTime("2022-03-07"),
                    created_by = "Application",
                    modified_date = Convert.ToDateTime("2022-03-07"),
                    modified_by = "Application"
                });
                dbContext.CompanyRoles.Add(new Role
                {
                    id = 0,
                    role_identifier = new Guid("6c0276ec-fea1-4fa8-bb1f-5d988a850200"),
                    company_identifier = "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
                    role_name = "HR Manager",
                    is_active = true,
                    created_date = Convert.ToDateTime("2022-03-07"),
                    created_by = "Application",
                    modified_date = Convert.ToDateTime("2022-03-07"),
                    modified_by = "Application"
                });
                dbContext.CompanyRoles.Add(new Role
                {
                    id = 0,
                    role_identifier = new Guid("6c0276ec-fea1-4fa8-bb1f-9d228a850201"),
                    company_identifier = "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
                    role_name = "Approver",
                    is_active = true,
                    created_date = Convert.ToDateTime("2022-03-07"),
                    created_by = "Application",
                    modified_date = Convert.ToDateTime("2022-03-07"),
                    modified_by = "Application"
                });

                dbContext.SaveChanges();
            }

            if (!dbContext.AppUsers.Any())
            {
                dbContext.AppUsers.Add(new AppUser
                {
                    id = 0,
                    user_identifier = new Guid("6c0279ec-fea1-4fa8-bb1f-5d428a850222"),
                    company_identifier = "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
                    user_name = "achatterjee@localhost",
                    user_role = "6C0276EC-FEA1-4FA8-BB1F-5D428A820209",
                    user_group = "6C0276EC-FEA1-4FA8-BB1F-5D428A850290",
                    is_active = true,
                    created_date = Convert.ToDateTime("2022-03-07"),
                    created_by = "Application",
                    modified_date = Convert.ToDateTime("2022-03-07"),
                    modified_by = "Application"
                });
                dbContext.AppUsers.Add(new AppUser
                {
                    id = 0,
                    user_identifier = new Guid("6c0278ec-fea1-4fa8-bb1f-5d428a850222"),
                    company_identifier = "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
                    user_name = "achatterjee1@localhost",
                    user_role = "6C0276EC-FEA1-4FA8-BB1F-5D428A820209",
                    user_group = "6C0276EC-FEA1-4FA8-BB1F-5D428A850228",
                    is_active = true,
                    created_date = Convert.ToDateTime("2022-03-07"),
                    created_by = "Application",
                    modified_date = Convert.ToDateTime("2022-03-07"),
                    modified_by = "Application"
                });
                dbContext.AppUsers.Add(new AppUser
                {
                    id = 0,
                    user_identifier = new Guid("6c0277ec-fea1-4fa8-bb1f-5d428a850222"),
                    company_identifier = "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
                    user_name = "achatterjee2@localhost",
                    user_role = "6C0276EC-FEA1-4FA8-BB1F-5D988A850200",
                    user_group = "6C0276EC-FEA1-4FA8-BB1F-5D428A850228",
                    is_active = true,
                    created_date = Convert.ToDateTime("2022-03-07"),
                    created_by = "Application",
                    modified_date = Convert.ToDateTime("2022-03-07"),
                    modified_by = "Application"
                });
                dbContext.AppUsers.Add(new AppUser
                {
                    id = 0,
                    user_identifier = new Guid("6c0272ec-fea1-4fa8-bb1f-5d428a850222"),
                    company_identifier = "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
                    user_name = "achatterjee3@localhost",
                    user_role = "6C0276EC-FEA1-4FA8-BB1F-5D988A850200",
                    user_group = "6C0276EC-FEA1-4FA8-BB1F-5D428A850201",
                    is_active = true,
                    created_date = Convert.ToDateTime("2022-03-07"),
                    created_by = "Application",
                    modified_date = Convert.ToDateTime("2022-03-07"),
                    modified_by = "Application"
                });
                dbContext.AppUsers.Add(new AppUser
                {
                    id = 0,
                    user_identifier = new Guid("6c0271ec-fea1-4fa8-bb1f-5d428a850222"),
                    company_identifier = "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
                    user_name = "nrao@localhost",
                    user_role = "6C0276EC-FEA1-4FA8-BB1F-9D228A850201",
                    user_group = "6C0276EC-FEA1-4FA8-BB1F-5D428A850201",
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
