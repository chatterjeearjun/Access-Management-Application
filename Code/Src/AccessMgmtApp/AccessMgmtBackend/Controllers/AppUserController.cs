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
                return _companyContext.AppUsers.Where(x => x.company_identifier == companyId).ToList();
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
            var appUser = _companyContext.AppUsers.FirstOrDefault(s => s.user_identifier == new Guid(guid));
            if (appUser != null)
            {
                appUser.user_description_attachment = !string.IsNullOrEmpty(appUser.user_description_attachment) ? _companyContext.UploadedFiles.FirstOrDefault
                           (s => s.file_identifier.ToString() == appUser.user_description_attachment)?.blob_file_name : String.Empty;
            }
           
            return appUser;
        }

        // POST api/<AppUserController>
        [HttpPost]
        public async Task<AppUser> Post([FromForm] CreateAppUser value)
        {
            var appUser = new AppUser();
            appUser.created_date = DateTime.UtcNow;
            appUser.created_by = "Application";
            appUser.is_approved = true;

            if (value.user_description_attachment != null)
            {
                // Add user to AppUser table
                GenericAPICalls request = new GenericAPICalls();
                var file = new FileModel
                {
                    File = value.user_description_attachment,
                    upload_category = "User",
                    company_identifier = value.company_identifier,
                    user_identifier = ""
                };
                var response = request.FileUploadPostEndpoint("api/FileUpload/UploadDocument", file);
                if (response.Result.IsSuccessStatusCode)
                {
                    UploadedFile userResponse = await response.Result.Content.ReadAsAsync<UploadedFile>();
                    appUser.user_description_attachment = userResponse?.file_identifier.ToString();
                }
            }

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
                        is_active = false,
                        created_date = DateTime.UtcNow,
                        created_by = "Application"
                    });
                }
            }
            _companyContext.SaveChanges();

            var newUser = _companyContext.AppUsers.FirstOrDefault(s => s.user_name == value.user_name);
            newUser.user_description_attachment = !string.IsNullOrEmpty(newUser.user_description_attachment) ?
                _companyContext.UploadedFiles.FirstOrDefault(s => s.file_identifier.ToString() == appUser.user_description_attachment)?.blob_file_name : string.Empty;
            return newUser;

        }

        // PUT api/<AppUserController>/5
        [HttpPut]
        public AppUser Put([FromBody] UpdateAppUser value)
        {
            var appusers = _companyContext.AppUsers.FirstOrDefault(s => s.user_identifier.ToString() == value.user_identifier);
            if (appusers != null)
            {
                var appUser = new AppUser();
                appUser.id = appusers.id;
                appUser.created_by = appusers.created_by;
                appUser.created_date = appusers.created_date;
                appUser.modified_date = DateTime.UtcNow;
                appUser.modified_by = "Application";
                appUser.user_identifier = appusers.user_identifier;
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
                            is_active = false,
                            created_date = DateTime.UtcNow,
                            created_by = "Application"
                        });
                    }
                }
                _companyContext.SaveChanges();
                return _companyContext.AppUsers.FirstOrDefault(s => s.user_identifier.ToString() == value.user_identifier);
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
                _companyContext.AssetToUsers.UpdateRange(_companyContext.AssetToUsers.Where(x =>
                x.company_identifier == deleteAppuser.company_identifier && x.user_identifier == deleteAppuser.user_identifier.ToString()).ToList()
                   .Select(x => { x.is_active = false; x.modified_date = DateTime.UtcNow; x.modified_by = "Application"; return x; }));
                _companyContext.RoleToUsers.UpdateRange(_companyContext.RoleToUsers.Where
                    (x => x.company_identifier == appuser.company_identifier && x.user_identifier == appuser.user_identifier.ToString()).ToList()
                   .Select(x => { x.is_active = false; x.modified_date = DateTime.UtcNow; x.modified_by = "Application"; return x; }));
                appuser.is_active = false;
                appuser.modified_date = DateTime.UtcNow;
                appuser.modified_by = "Application";
                _companyContext.AppUsers.Update(appuser);
                var identityUser = _companyContext.Users.FirstOrDefault(s => s.UserName == appuser.user_name);
                if (identityUser != null)
                {
                    _companyContext.UserLogins.RemoveRange(_companyContext.UserLogins.Where(ul => ul.UserId == identityUser.Id));
                    _companyContext.UserRoles.RemoveRange(_companyContext.UserRoles.Where(ur => ur.UserId == identityUser.Id));
                    _companyContext.UserTokens.RemoveRange(_companyContext.UserTokens.Where(us => us.UserId == identityUser.UserName));
                    _companyContext.UserClaims.RemoveRange(_companyContext.UserClaims.Where(um => um.UserId == identityUser.Id));
                    _companyContext.Users.Remove(_companyContext.Users.Where(usr => usr.Id == identityUser.Id).Single());
                }
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
