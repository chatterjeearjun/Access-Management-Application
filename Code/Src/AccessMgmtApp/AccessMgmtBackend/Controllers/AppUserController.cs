using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUserController : ControllerBase
    {
        private CompanyContext _companyContext;
        public AppUserController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<AppUserController>
        [HttpGet]
        public IEnumerable<AppUser> GetByCompany(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                return _companyContext.AppUsers.Where(x => x.company_identifier == companyId);
            }
            else
            {
                return null;
            }
        }

        // GET api/<AppUserController>/5
        [HttpGet("{guid}")]
        public AppUser Get(string guid)
        {
            return _companyContext.AppUsers.FirstOrDefault(s => s.user_identifier == new Guid(guid));
        }

        // POST api/<AppUserController>
        [HttpPost]
        public AppUser Post([FromBody] CreateAppUser value)
        {
            var appUser = new AppUser();
            appUser.created_date = DateTime.UtcNow;
            appUser.created_by = "Application";
            appUser.is_active = true;
            PropertyCopier<CreateAppUser, AppUser>.Copy(value, appUser);
            _companyContext.AppUsers.Add(appUser);
            if (!string.IsNullOrEmpty(appUser.associated_assets))
            {
                string[] assets = appUser.associated_assets.Split(',');
                foreach (var asset in assets)
                {
                    _companyContext.AssetToUsers.Add(new AssetToUser
                    {
                        id = 0,
                        company_identifier = appUser.company_identifier,
                        asset_identifier = asset.ToString(),
                        user_identifier = appUser.user_identifier.ToString(),
                        is_active = true,
                        created_date = DateTime.UtcNow,
                        created_by = "Application"
                    });
                }
            }
            _companyContext.SaveChanges();
            return _companyContext.AppUsers.FirstOrDefault(s => s.user_name == value.user_name);
        }

        // PUT api/<AppUserController>/5
        [HttpPut]
        public AppUser Put([FromBody] UpdateAppUser value)
        {
            var appusers = _companyContext.AppUsers.FirstOrDefault(s => s.user_identifier == value.user_identifier);
            if (appusers != null)
            {
                var appUser = new AppUser();
                appUser.id = appusers.id;
                appUser.created_by = appusers.created_by;
                appUser.created_date = appusers.created_date;
                appUser.modified_date = DateTime.UtcNow;
                appUser.modified_by = "Application";
                PropertyCopier<UpdateAppUser, AppUser>.Copy(value, appUser);
                _companyContext.Entry<AppUser>(appusers).CurrentValues.SetValues(appUser);
                //Added logic for asset addition/updation
                _companyContext.AssetToUsers.RemoveRange(_companyContext.AssetToUsers.Where
                    (x => x.company_identifier == appusers.company_identifier && x.user_identifier == appusers.user_identifier.ToString()));

                if (!string.IsNullOrEmpty(appUser.associated_assets))
                {
                    string[] assets = appUser.associated_assets.Split(',');
                    foreach (var asset in assets)
                    {
                        _companyContext.AssetToUsers.Add(new AssetToUser
                        {
                            id = 0,
                            company_identifier = appUser.company_identifier,
                            asset_identifier = asset.ToString(),
                            user_identifier = appUser.user_identifier.ToString(),
                            is_active = true,
                            created_date = DateTime.UtcNow,
                            created_by = "Application"
                        });
                    }
                }
                _companyContext.SaveChanges();
                return _companyContext.AppUsers.FirstOrDefault(s => s.user_identifier == value.user_identifier);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<AppUserController>/5
        [HttpDelete]
        public IEnumerable<AppUser> Delete([FromBody] DeleteAppUser deleteAppuser)
        {
            var appuser = _companyContext.AppUsers.FirstOrDefault(s => s.user_identifier == deleteAppuser.user_identifier);
            if (appuser != null)
            {
                _companyContext.AppUsers.Remove(appuser);
                _companyContext.SaveChanges();
                return _companyContext.AppUsers.Where(x => x.company_identifier == deleteAppuser.company_identifier);
            }
            else
            {
                return _companyContext.AppUsers.Where(x => x.company_identifier == deleteAppuser.company_identifier);
            }
        }
    }
}
