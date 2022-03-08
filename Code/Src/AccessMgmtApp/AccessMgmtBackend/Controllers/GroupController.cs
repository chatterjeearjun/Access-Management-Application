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
        public IEnumerable<Group> Get(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                return _companyContext.Groups.Where(x => x.company_id == Convert.ToInt32(companyId));
            }
            else
            {
                return null;
            }
        }

        // GET api/<GroupController>/5
        [HttpGet("{id}")]
        public Group Get(int id)
        {
            return _companyContext.Groups.FirstOrDefault(s => s.id == id);
        }

        // POST api/<GroupController>
        [HttpPost]
        public Group Post([FromBody] Group value)
        {
            value.created_date = DateTime.UtcNow;
            value.created_by = "Application";
            _companyContext.Groups.Add(value);
            _companyContext.SaveChanges();
            return _companyContext.Groups.FirstOrDefault(s => s.group_name == value.group_name && s.company_id == value.company_id);
        }

        // PUT api/<GroupController>/5
        [HttpPut("{id}")]
        public Group Put(int id, [FromBody] Group value)
        {
            var group = _companyContext.Groups.FirstOrDefault(s => s.id == id);
            if (group != null)
            {
                value.modified_date = DateTime.UtcNow;
                value.modified_by = "Application";
                _companyContext.Entry<Group>(group).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.Groups.FirstOrDefault(s => s.id == id);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<GroupController>/5
        [HttpDelete("{id}")]
        public IEnumerable<Group> Delete(int id)
        {
            var asset = _companyContext.Groups.FirstOrDefault(s => s.id == id);
            if (asset != null)
            {
                _companyContext.Groups.Remove(asset);
                _companyContext.SaveChanges();
                return _companyContext.Groups.Where(x => x.company_id == asset.company_id);
            }
            else
            {
                return null;
            }
        }
    }
}
