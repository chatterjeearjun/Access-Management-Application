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
        public IEnumerable<Role> Get(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                return _companyContext.CompanyRoles.Where(x => x.company_id == Convert.ToInt32(companyId));
            }
            else
            {
                return null;
            }
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public Role Get(int id)
        {
            return _companyContext.CompanyRoles.FirstOrDefault(s => s.id == id);
        }

        // POST api/<RoleController>
        [HttpPost]
        public Role Post([FromBody] Role value)
        {
            value.created_date = DateTime.UtcNow;
            value.created_by = "Application";
            _companyContext.CompanyRoles.Add(value);
            _companyContext.SaveChanges();
            return _companyContext.CompanyRoles.FirstOrDefault(s => s.role_name == value.role_name && s.company_id == value.company_id);
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        public Role Put(int id, [FromBody] Role value)
        {
            var role = _companyContext.CompanyRoles.FirstOrDefault(s => s.id == id);
            if (role != null)
            {
                value.modified_date = DateTime.UtcNow;
                value.modified_by = "Application";
                _companyContext.Entry<Role>(role).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.CompanyRoles.FirstOrDefault(s => s.id == id);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        public IEnumerable<Role> Delete(int id)
        {
            var role = _companyContext.CompanyRoles.FirstOrDefault(s => s.id == id);
            if (role != null)
            {
                _companyContext.CompanyRoles.Remove(role);
                _companyContext.SaveChanges();
                return _companyContext.CompanyRoles.Where(x => x.company_id == role.company_id);
            }
            else
            {
                return null;
            }
        }
    }
}
