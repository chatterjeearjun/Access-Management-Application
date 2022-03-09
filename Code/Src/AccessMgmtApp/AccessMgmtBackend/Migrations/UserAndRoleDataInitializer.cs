using AccessMgmtBackend.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace AccessMgmtBackend.Migrations
{
    public static class UserAndRoleDataInitializer
    {
        public static void SeedData(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }

        private static void SeedUsers(UserManager<User> userManager)
        {
            if (userManager.FindByEmailAsync("achatterjee@localhost").Result == null)
            {
                User user = new User();
                user.UserName = "achatterjee@localhost";
                user.Email = "achatterjee@localhost";
                user.FirstName = "Arjun";
                user.LastName = "Chatterjee";

                IdentityResult result = userManager.CreateAsync(user, "P@ssw0rd1!").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Approver").Wait();
                }
            }


            if (userManager.FindByEmailAsync("nrao@localhost").Result == null)
            {
                User user = new User();
                user.UserName = "nrao@localhost";
                user.Email = "nrao@localhost";
                user.FirstName = "Nagesh";
                user.LastName = "Rao";

                IdentityResult result = userManager.CreateAsync(user, "P@ssw0rd1!").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Administrator").Wait();
                }
            }
        }

        private static void SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("Approver").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Approver";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
            if (!roleManager.RoleExistsAsync("HR Manager").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "HR Manager";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
            if (!roleManager.RoleExistsAsync("Administrator").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Administrator";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
        }
    }
}
