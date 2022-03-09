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
        public IEnumerable<AppUser> Get(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                return _companyContext.AppUsers.Where(x => x.company_id == Convert.ToInt32(companyId));
            }
            else
            {
                return null;
            }
        }

        // GET api/<AppUserController>/5
        [HttpGet("{id}")]
        public AppUser Get(int id)
        {
            return _companyContext.AppUsers.FirstOrDefault(s => s.id == id);
        }

        // POST api/<AppUserController>
        [HttpPost]
        public AppUser Post([FromBody] AppUser value)
        {
            value.created_date = DateTime.UtcNow;
            value.created_by = "Application";
            _companyContext.AppUsers.Add(value);
            _companyContext.SaveChanges();
            return _companyContext.AppUsers.FirstOrDefault(s => s.user_name == value.user_name && s.company_id == value.company_id);
        }

        // PUT api/<AppUserController>/5
        [HttpPut("{id}")]
        public AppUser Put(int id, [FromBody] AppUser value)
        {
            var role = _companyContext.AppUsers.FirstOrDefault(s => s.id == id);
            if (role != null)
            {
                value.modified_date = DateTime.UtcNow;
                value.modified_by = "Application";
                _companyContext.Entry<AppUser>(role).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.AppUsers.FirstOrDefault(s => s.id == id);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<AppUserController>/5
        [HttpDelete("{id}")]
        public IEnumerable<AppUser> Delete(int id)
        {
            var appuser = _companyContext.AppUsers.FirstOrDefault(s => s.id == id);
            if (appuser != null)
            {
                _companyContext.AppUsers.Remove(appuser);
                _companyContext.SaveChanges();
                return _companyContext.AppUsers.Where(x => x.company_id == appuser.company_id);
            }
            else
            {
                return null;
            }
        }
    }
}
