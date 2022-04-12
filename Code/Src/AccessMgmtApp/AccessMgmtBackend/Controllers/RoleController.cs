using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private CompanyContext _companyContext;
        private RoleManager<IdentityRole> _roleManager;
        public RoleController(CompanyContext companyContext, RoleManager<IdentityRole> roleManager)
        {
            _companyContext = companyContext;
            _roleManager = roleManager;
        }
               

        [Route("AttachRequiredDocument")]
        [HttpPost]
        public IActionResult AttachRequiredDocument(string companyId, string roleId, List<string> documentId)
        {
            try
            {
                if (!string.IsNullOrEmpty(companyId) && !string.IsNullOrEmpty(roleId) && documentId != null && documentId.Count > 0)
                {
                    var associatedRole = _companyContext.CompanyRoles.FirstOrDefault(x => x.company_identifier == companyId && x.role_identifier.ToString() == roleId && x.is_active);
                    if (associatedRole != null)
                    {
                        foreach (var document in documentId)
                        {
                            var associatedAdditionalDocument = _companyContext.AdditionalDocuments.FirstOrDefault(x => x.document_identifier.ToString() == document && x.is_active);
                            if (associatedAdditionalDocument != null)
                            {
                                _companyContext.RoleToDocuments.Add(new RoleToDocument
                                {
                                    id = 0,
                                    company_identifier = companyId,
                                    role_identifier = roleId,
                                    document_identifier = document,
                                    is_active = true,
                                    is_approved = true,
                                    created_date = DateTime.UtcNow,
                                    created_by = "Application"
                                });
                            }
                            else
                            {
                                return BadRequest("No documents record found");
                            }
                        }
                        _companyContext.SaveChanges();
                        return Ok();
                    }
                    else
                    {
                        return BadRequest("No matching record found");
                    }
                }
                else
                {
                    return BadRequest("Invalid Request");
                }

            }
            catch (Exception ex)
            {
                return BadRequest("ERROR");
            }
        }

        [Route("DetachRequiredDocument")]
        [HttpPost]
        public IActionResult DetachRequiredDocument(string companyId, string roleId, List<string> documentId)
        {
            try
            {
                if (!string.IsNullOrEmpty(companyId) && !string.IsNullOrEmpty(roleId) && documentId != null && documentId.Count > 0)
                {
                    foreach (var document in documentId)
                    {
                        var roleToDocument = _companyContext.RoleToDocuments.FirstOrDefault(x => x.role_identifier == roleId
                         && x.document_identifier == document && x.company_identifier == companyId);
                        if (roleToDocument != null)
                        {
                            _companyContext.RoleToDocuments.Remove(roleToDocument);
                        }
                        else
                        {
                            return BadRequest("No documents record found");
                        }
                    }
                    _companyContext.SaveChanges();
                    return Ok();
                }
                else
                {
                    return BadRequest("Invalid Request");
                }


            }
            catch (Exception ex)
            {
                return BadRequest("ERROR");
            }
        }

        // GET: api/<RoleController>
        [HttpGet]
        public IEnumerable<Role> GetByCompany(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                var listOfRoles = _companyContext.CompanyRoles.Where(x => x.company_identifier == companyId && x.is_active).ToList();
                foreach (var i in listOfRoles)
                {
                    i.associated_groups = String.Join(",",
                    _companyContext.GroupToRoles.Where(x => x.company_identifier == companyId && x.role_identifier == i.role_identifier.ToString() && x.is_active == true).
                    Select(x => x.group_identifier));
                    i.associated_assets = String.Join(",",
                    _companyContext.AssetToRoles.Where(x => x.company_identifier == companyId && x.role_identifier == i.role_identifier.ToString() && x.is_active == true).
                    Select(x => x.asset_identifier));
                }
                return listOfRoles;
            }
            else
            {
                return null;
            }
        }

        // GET api/<RoleController>/5
        [HttpGet("{guid}")]
        public Role Get(string guid)
        {
            var role = _companyContext.CompanyRoles.FirstOrDefault(s => s.role_identifier == new Guid(guid));
            if (role != null)
            {
                role.role_description_attachment = !string.IsNullOrEmpty(role.role_description_attachment) ? _companyContext.UploadedFiles.FirstOrDefault
                        (s => s.file_identifier.ToString() == role.role_description_attachment)?.blob_file_name : String.Empty;
                role.associated_groups = String.Join(",",
                 _companyContext.GroupToRoles.Where(x => x.company_identifier == role.company_identifier && x.role_identifier == role.role_identifier.ToString() && x.is_active == true).
                 Select(x => x.group_identifier));
                role.associated_assets = String.Join(",",
                _companyContext.AssetToRoles.Where(x => x.company_identifier == role.company_identifier && x.role_identifier == role.role_identifier.ToString() && x.is_active == true).
                Select(x => x.asset_identifier));
            }
            return role;
        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<Role> Post([FromForm] CreateRole value)
        {
            var role = new Role();
            role.created_date = DateTime.UtcNow;
            role.created_by = "Application";
            role.is_active = true;

            if (value.role_description_attachment != null)
            {
                // Add user to AppUser table
                GenericAPICalls request = new GenericAPICalls();
                var file = new FileModel
                {
                    File = value.role_description_attachment,
                    upload_category = "Role",
                    company_identifier = value.company_identifier,
                    user_identifier = ""
                };
                var response = request.FileUploadPostEndpoint("api/FileUpload/UploadDocument", file);
                if (response.Result.IsSuccessStatusCode)
                {
                    UploadedFile userResponse = await response.Result.Content.ReadAsAsync<UploadedFile>();
                    role.role_description_attachment = userResponse?.file_identifier.ToString();
                }
            }

            PropertyCopier<CreateRole, Role>.Copy(value, role);
            _companyContext.CompanyRoles.Add(role);
            //Added logic for asset addition
            if (!string.IsNullOrEmpty(role.associated_assets))
            {
                string[] assets = role.associated_assets.Split(',');
                foreach (var asset in assets)
                {
                    _companyContext.AssetToRoles.Add(new AssetToRole
                    {
                        id = 0,
                        company_identifier = role.company_identifier,
                        asset_identifier = asset.ToString(),
                        role_identifier = role.role_identifier.ToString(),
                        is_active = true,
                        created_date = DateTime.UtcNow,
                        created_by = "Application"
                    });
                }
            }
            if (!string.IsNullOrEmpty(role.associated_groups))
            {
                string[] groups = role.associated_groups.Split(',');
                foreach (var group in groups)
                {
                    _companyContext.GroupToRoles.Add(new GroupToRole
                    {
                        id = 0,
                        company_identifier = role.company_identifier,
                        group_identifier = group.ToString(),
                        role_identifier = role.role_identifier.ToString(),
                        is_active = true,
                        created_date = DateTime.UtcNow,
                        created_by = "Application"
                    });
                }
            }
            _companyContext.SaveChanges();
            if (!_roleManager.RoleExistsAsync(role.role_identifier.ToString()).Result)
            {
                IdentityRole identityRole = new IdentityRole();
                identityRole.Name = role.role_identifier.ToString();
                IdentityResult roleResult = _roleManager.
                CreateAsync(identityRole).Result;
            }

            var newrole = _companyContext.CompanyRoles.FirstOrDefault(s => s.role_name == value.role_name);
            newrole.role_description_attachment = !string.IsNullOrEmpty(newrole.role_description_attachment) ?
                _companyContext.UploadedFiles.FirstOrDefault(s => s.file_identifier.ToString() == role.role_description_attachment)?.blob_file_name : string.Empty;
            return newrole;
        }

        // PUT api/<RoleController>/5
        [HttpPut]
        public Role Put([FromBody] UpdateRole value)
        {
            var role = _companyContext.CompanyRoles.FirstOrDefault(s => s.role_identifier.ToString() == value.role_identifier);
            if (role != null)
            {
                var roleNew = new Role();
                roleNew.id = role.id;
                roleNew.created_by = role.created_by;
                roleNew.created_date = role.created_date;
                roleNew.modified_date = DateTime.UtcNow;
                roleNew.modified_by = "Application";
                roleNew.role_identifier = role.role_identifier;
                roleNew.is_active = true;
                PropertyCopier<UpdateRole, Role>.Copy(value, roleNew);
                _companyContext.Entry<Role>(role).CurrentValues.SetValues(roleNew);
                //Added logic for asset addition/updation
                _companyContext.AssetToRoles.RemoveRange(_companyContext.AssetToRoles.Where
                    (x => x.company_identifier == role.company_identifier && x.role_identifier == role.role_identifier.ToString()));
                _companyContext.GroupToRoles.RemoveRange(_companyContext.GroupToRoles.Where
                    (x => x.company_identifier == role.company_identifier && x.role_identifier == role.role_identifier.ToString()));

                if (!string.IsNullOrEmpty(roleNew.associated_assets))
                {
                    string[] assets = roleNew.associated_assets.Split(',');
                    foreach (var asset in assets)
                    {
                        _companyContext.AssetToRoles.Add(new AssetToRole
                        {
                            id = 0,
                            company_identifier = roleNew.company_identifier,
                            asset_identifier = asset.ToString(),
                            role_identifier = roleNew.role_identifier.ToString(),
                            is_active = true,
                            created_date = DateTime.UtcNow,
                            created_by = "Application"
                        });
                    }
                }
                if (!string.IsNullOrEmpty(roleNew.associated_groups))
                {
                    string[] groups = roleNew.associated_groups.Split(',');
                    foreach (var group in groups)
                    {
                        _companyContext.GroupToRoles.Add(new GroupToRole
                        {
                            id = 0,
                            company_identifier = roleNew.company_identifier,
                            group_identifier = group.ToString(),
                            role_identifier = roleNew.role_identifier.ToString(),
                            is_active = true,
                            created_date = DateTime.UtcNow,
                            created_by = "Application"
                        });
                    }
                }
                _companyContext.SaveChanges();
                return _companyContext.CompanyRoles.FirstOrDefault(s => s.role_identifier.ToString() == value.role_identifier);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<RoleController>/5
        [HttpDelete]
        public IEnumerable<Role> Delete([FromBody] DeleteRole value)
        {
            var role = _companyContext.CompanyRoles.FirstOrDefault(s => s.role_identifier == value.role_identifier && s.is_active);
            if (role != null)
            {
                role.is_active = false;
                role.modified_date = DateTime.UtcNow;
                role.modified_by = "Application";
                _companyContext.CompanyRoles.Update(role);
                _companyContext.AssetToRoles.UpdateRange(_companyContext.AssetToRoles.Where
                   (x => x.company_identifier == role.company_identifier && x.role_identifier == role.role_identifier.ToString()).ToList()
                   .Select(x => { x.is_active = false; x.modified_date = DateTime.UtcNow; x.modified_by = "Application"; return x; }));
                _companyContext.GroupToRoles.UpdateRange(_companyContext.GroupToRoles.Where
                    (x => x.company_identifier == role.company_identifier && x.role_identifier == role.role_identifier.ToString()).ToList()
                   .Select(x => { x.is_active = false; x.modified_date = DateTime.UtcNow; x.modified_by = "Application"; return x; }));
                _companyContext.EmployeeToRoles.UpdateRange(_companyContext.EmployeeToRoles.Where
                    (x => x.company_identifier == role.company_identifier && x.role_identifier == role.role_identifier.ToString()).ToList()
                   .Select(x => { x.is_active = false; x.modified_date = DateTime.UtcNow; x.modified_by = "Application"; return x; }));
                _companyContext.RoleToUsers.UpdateRange(_companyContext.RoleToUsers.Where
                    (x => x.company_identifier == role.company_identifier && x.role_identifier == role.role_identifier.ToString()).ToList()
                   .Select(x => { x.is_active = false; x.modified_date = DateTime.UtcNow; x.modified_by = "Application"; return x; }));
                if (_roleManager.RoleExistsAsync(role.role_identifier.ToString()).Result)
                {
                    var result = Task.Run(async () =>
                    {
                        await _roleManager.DeleteAsync(await _roleManager.FindByNameAsync(role.role_identifier.ToString()));
                    });
                }

                _companyContext.SaveChanges();
                return _companyContext.CompanyRoles.Where(x => x.company_identifier == value.company_identifier && x.is_active).ToList();
            }
            else
            {
                return _companyContext.CompanyRoles.Where(x => x.company_identifier == value.company_identifier && x.is_active).ToList();
            }
        }
    }
}
