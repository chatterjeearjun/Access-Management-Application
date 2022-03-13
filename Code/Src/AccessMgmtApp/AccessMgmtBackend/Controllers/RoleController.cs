using AccessMgmtBackend.Context;
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
        public Role Post([FromBody] Role value)
        {
            value.created_date = DateTime.UtcNow;
            value.created_by = "Application";
            _companyContext.CompanyRoles.Add(value);
            _companyContext.SaveChanges();
            return _companyContext.CompanyRoles.FirstOrDefault(s => s.role_name == value.role_name);
        }

        // PUT api/<RoleController>/5
        [HttpPut("{guid}")]
        public Role Put(string guid, [FromBody] Role value)
        {
            var role = _companyContext.CompanyRoles.FirstOrDefault(s => s.role_identifier == new Guid(guid));
            if (role != null)
            {
                value.modified_date = DateTime.UtcNow;
                value.modified_by = "Application";
                _companyContext.Entry<Role>(role).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.CompanyRoles.FirstOrDefault(s => s.role_identifier == new Guid(guid));
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{guid}")]
        public IEnumerable<Role> Delete(string guid, string companyId)
        {
            var role = _companyContext.CompanyRoles.FirstOrDefault(s => s.role_identifier == new Guid(guid));
            if (role != null)
            {
                _companyContext.CompanyRoles.Remove(role);
                _companyContext.SaveChanges();
                return _companyContext.CompanyRoles.Where(x => x.company_identifier == companyId);
            }
            else
            {
                return _companyContext.CompanyRoles.Where(x => x.company_identifier == companyId);
            }
        }
    }
}
