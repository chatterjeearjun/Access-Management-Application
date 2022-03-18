using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private CompanyContext _companyContext;
        public RoleController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<RoleController>
        [HttpGet]
        public IEnumerable<Role> GetByCompany(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                return _companyContext.CompanyRoles.Where(x => x.company_identifier == companyId);
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
            return _companyContext.CompanyRoles.FirstOrDefault(s => s.role_identifier == new Guid(guid));
        }

        // POST api/<RoleController>
        [HttpPost]
        public Role Post([FromBody] CreateRole value)
        {
            var role = new Role();
            role.created_date = DateTime.UtcNow;
            role.created_by = "Application";
            role.is_active = true;
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
            return _companyContext.CompanyRoles.FirstOrDefault(s => s.role_name == value.role_name);
        }

        // PUT api/<RoleController>/5
        [HttpPut]
        public Role Put([FromBody] UpdateRole value)
        {
            var role = _companyContext.CompanyRoles.FirstOrDefault(s => s.role_identifier == value.role_identifier);
            if (role != null)
            {
                var roleNew = new Role();
                roleNew.id = role.id;
                roleNew.created_by = role.created_by;
                roleNew.created_date = role.created_date;
                roleNew.modified_date = DateTime.UtcNow;
                roleNew.modified_by = "Application";
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
                return _companyContext.CompanyRoles.FirstOrDefault(s => s.role_identifier == value.role_identifier);
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
            var role = _companyContext.CompanyRoles.FirstOrDefault(s => s.role_identifier == value.role_identifier);
            if (role != null)
            {
                _companyContext.CompanyRoles.Remove(role);
                _companyContext.AssetToRoles.RemoveRange(_companyContext.AssetToRoles.Where
                   (x => x.company_identifier == role.company_identifier && x.role_identifier == role.role_identifier.ToString()));
                _companyContext.GroupToRoles.RemoveRange(_companyContext.GroupToRoles.Where
                    (x => x.company_identifier == role.company_identifier && x.role_identifier == role.role_identifier.ToString()));
                _companyContext.SaveChanges();
                return _companyContext.CompanyRoles.Where(x => x.company_identifier == value.company_identifier);
            }
            else
            {
                return _companyContext.CompanyRoles.Where(x => x.company_identifier == value.company_identifier);
            }
        }
    }
}
