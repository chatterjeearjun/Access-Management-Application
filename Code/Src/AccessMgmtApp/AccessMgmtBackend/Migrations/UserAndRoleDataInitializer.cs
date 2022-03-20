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
                    userManager.AddToRoleAsync(user, "6c0276ec-fea1-4fa8-bb1f-5d428a820209").Wait();
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
                    userManager.AddToRoleAsync(user, "6c0276ec-fea1-4fa8-bb1f-5d428a820209").Wait();
                }
            }
        }

        private static void SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("6c0276ec-fea1-4fa8-bb1f-9d228a850201").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "6c0276ec-fea1-4fa8-bb1f-9d228a850201";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
            if (!roleManager.RoleExistsAsync("6c0276ec-fea1-4fa8-bb1f-5d988a850200").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "6c0276ec-fea1-4fa8-bb1f-5d988a850200";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
            if (!roleManager.RoleExistsAsync("6c0276ec-fea1-4fa8-bb1f-5d428a820209").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "6c0276ec-fea1-4fa8-bb1f-5d428a820209";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
        }
    }
}
