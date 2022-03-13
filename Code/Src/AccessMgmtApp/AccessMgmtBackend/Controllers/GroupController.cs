using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private CompanyContext _companyContext;
        public GroupController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<GroupController>
        [HttpGet]
        public IEnumerable<Group> GetByCompany(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                return _companyContext.Groups.Where(x => x.company_identifier == companyId);
            }
            else
            {
                return null;
            }
        }

        // GET api/<GroupController>/5
        [HttpGet("{guid}")]
        public Group Get(string guid)
        {
            return _companyContext.Groups.FirstOrDefault(s => s.group_identifier == new Guid(guid));
        }

        // POST api/<GroupController>
        [HttpPost]
        public Group Post([FromBody] Group value)
        {
            value.created_date = DateTime.UtcNow;
            value.created_by = "Application";
            _companyContext.Groups.Add(value);
            _companyContext.SaveChanges();
            return _companyContext.Groups.FirstOrDefault(s => s.group_name == value.group_name);
        }

        // PUT api/<GroupController>/5
        [HttpPut("{guid}")]
        public Group Put(string guid, [FromBody] Group value)
        {
            var group = _companyContext.Groups.FirstOrDefault(s => s.group_identifier == new Guid(guid));
            if (group != null)
            {
                value.modified_date = DateTime.UtcNow;
                value.modified_by = "Application";
                _companyContext.Entry<Group>(group).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.Groups.FirstOrDefault(s => s.group_identifier == new Guid(guid));
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<GroupController>/5
        [HttpDelete("{guid}")]
        public IEnumerable<Group> Delete(string guid, string companyId)
        {
            var group = _companyContext.Groups.FirstOrDefault(s => s.group_identifier == new Guid(guid));
            if (group != null)
            {
                _companyContext.Groups.Remove(group);
                _companyContext.SaveChanges();
                return _companyContext.Groups.Where(x => x.company_identifier == companyId);
            }
            else
            {
                return _companyContext.Groups.Where(x => x.company_identifier == companyId);
            }
        }
    }
}
