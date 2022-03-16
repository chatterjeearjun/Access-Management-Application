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
