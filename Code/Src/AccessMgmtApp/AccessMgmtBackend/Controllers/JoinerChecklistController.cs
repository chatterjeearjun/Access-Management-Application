using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
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
            return _companyContext.JoinerChecklists.Where(s => s.checklist_identifier == new Guid(guid) && s.is_active == true).ToList();
        }

        // GET api/<JoinerChecklistController>/5
        [HttpGet]
        public IEnumerable<JoinerChecklist> GetByCompany(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                return _companyContext.JoinerChecklists.Where(x => x.company_identifier == companyId).ToList();
            }
            else
            {
                return null;
            }
        }

        // POST api/<JoinerChecklistController>
        [HttpPost]
        public JoinerChecklist Post([FromBody] CreateJoinerChecklist value)
        {
            var joinercheck = new JoinerChecklist();
            joinercheck.created_date = DateTime.UtcNow;
            joinercheck.created_by = "Application";
            joinercheck.is_active = true;
            PropertyCopier<CreateJoinerChecklist, JoinerChecklist>.Copy(value, joinercheck);
            _companyContext.JoinerChecklists.Add(joinercheck);
            _companyContext.SaveChanges();
            return _companyContext.JoinerChecklists.FirstOrDefault(s => s.checklist_name == value.checklist_name);
        }

        // PUT api/<JoinerChecklistController>/5
        [HttpPut]
        public JoinerChecklist Put([FromBody] UpdateJoinerChecklist value)
        {
            var joinercheck = _companyContext.JoinerChecklists.FirstOrDefault(s => s.checklist_identifier == value.checklist_identifier);
            if (joinercheck != null)
            {
                var joinercheckNew = new JoinerChecklist();
                joinercheckNew.id = joinercheck.id;
                joinercheckNew.created_by = joinercheck.created_by;
                joinercheckNew.created_date = joinercheck.created_date;
                joinercheckNew.modified_date = DateTime.UtcNow;
                joinercheckNew.modified_by = "Application";
                joinercheckNew.is_active=true;
                PropertyCopier<UpdateJoinerChecklist, JoinerChecklist>.Copy(value, joinercheckNew);
                _companyContext.Entry<JoinerChecklist>(joinercheck).CurrentValues.SetValues(joinercheckNew);
                _companyContext.SaveChanges();
                return _companyContext.JoinerChecklists.FirstOrDefault(s => s.checklist_identifier == value.checklist_identifier);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<JoinerChecklistController>/5
        [HttpDelete]
        public IEnumerable<JoinerChecklist> Delete([FromBody] DeleteJoinerChecklist value)
        {
            var joinercheck = _companyContext.JoinerChecklists.FirstOrDefault(s => s.checklist_identifier == value.checklist_identifier && s.is_active==true);
            if (joinercheck != null)
            {
                joinercheck.is_active = false;
                joinercheck.modified_date = DateTime.UtcNow;
                joinercheck.modified_by = "Application";
                _companyContext.JoinerChecklists.Update(joinercheck);
                _companyContext.SaveChanges();
                return _companyContext.JoinerChecklists.Where(x => x.company_identifier == value.company_identifier && x.is_active==true);
            }
            else
            {
                return _companyContext.JoinerChecklists.Where(x => x.company_identifier == value.company_identifier && x.is_active==true);
            }
        }
    }
}
