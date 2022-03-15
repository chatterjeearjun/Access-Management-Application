using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JoinerChecklistController : ControllerBase
    {
        private CompanyContext _companyContext;
        public JoinerChecklistController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<JoinerChecklistController>
        [HttpGet("{guid}")]
        public IEnumerable<JoinerChecklist> Get(string guid)
        {
            return _companyContext.JoinerChecklists.Where(s => s.checklist_identifier == new Guid(guid));
        }

        // GET api/<JoinerChecklistController>/5
        [HttpGet]
        public IEnumerable<JoinerChecklist> GetByCompany(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                return _companyContext.JoinerChecklists.Where(x => x.company_identifier == companyId);
            }
            else
            {
                return null;
            }
        }

        // POST api/<JoinerChecklistController>
        [HttpPost]
        public JoinerChecklist Post([FromBody] JoinerChecklist value)
        {
            value.created_date = DateTime.UtcNow;
            value.created_by = "Application";
            _companyContext.JoinerChecklists.Add(value);
            _companyContext.SaveChanges();
            return _companyContext.JoinerChecklists.FirstOrDefault(s => s.checklist_name == value.checklist_name);
        }

        // PUT api/<JoinerChecklistController>/5
        [HttpPut("{guid}")]
        public JoinerChecklist Put(string guid, [FromBody] string value)
        {
            var employee = _companyContext.JoinerChecklists.FirstOrDefault(s => s.checklist_identifier == new Guid(guid));
            if (employee != null)
            {
                employee.modified_date = DateTime.UtcNow;
                employee.modified_by = "Application";
                _companyContext.Entry<JoinerChecklist>(employee).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.JoinerChecklists.FirstOrDefault(s => s.checklist_identifier == new Guid(guid));
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<JoinerChecklistController>/5
        [HttpDelete("{guid}")]
        public IEnumerable<JoinerChecklist> Delete(string guid, string companyId)
        {
            var student = _companyContext.JoinerChecklists.FirstOrDefault(s => s.checklist_identifier == new Guid(guid));
            if (student != null)
            {
                _companyContext.JoinerChecklists.Remove(student);
                _companyContext.SaveChanges();
                return _companyContext.JoinerChecklists.Where(x => x.company_identifier == companyId);
            }
            else
            {
                return _companyContext.JoinerChecklists.Where(x => x.company_identifier == companyId);
            }
        }
    }
}
