using AccessMgmtBackend.Context;
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
        public AppUser Post([FromBody] AppUser value)
        {
            value.created_date = DateTime.UtcNow;
            value.created_by = "Application";
            _companyContext.AppUsers.Add(value);
            _companyContext.SaveChanges();
            return _companyContext.AppUsers.FirstOrDefault(s => s.user_name == value.user_name);
        }

        // PUT api/<AppUserController>/5
        [HttpPut("{guid}")]
        public AppUser Put(string guid, [FromBody] AppUser value)
        {
            var role = _companyContext.AppUsers.FirstOrDefault(s => s.user_identifier == new Guid(guid));
            if (role != null)
            {
                value.modified_date = DateTime.UtcNow;
                value.modified_by = "Application";
                _companyContext.Entry<AppUser>(role).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.AppUsers.FirstOrDefault(s => s.user_identifier == new Guid(guid));
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<AppUserController>/5
        [HttpDelete("{id}")]
        public IEnumerable<AppUser> Delete(string guid, string companyId)
        {
            var appuser = _companyContext.AppUsers.FirstOrDefault(s => s.user_identifier == new Guid(guid));
            if (appuser != null)
            {
                _companyContext.AppUsers.Remove(appuser);
                _companyContext.SaveChanges();
                return _companyContext.AppUsers.Where(x => x.company_identifier == companyId);
            }
            else
            {
                return _companyContext.AppUsers.Where(x => x.company_identifier == companyId);
            }
        }
    }
}
