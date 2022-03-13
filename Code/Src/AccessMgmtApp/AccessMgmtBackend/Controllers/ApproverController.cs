using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApproverController : ControllerBase
    {
        private CompanyContext _companyContext;
        public ApproverController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<ApproverController>
        [HttpGet("{companyId}")]
        public IEnumerable<Approver> GetByCompany(string companyId)
        {
            return _companyContext.Approvers.Where(x => x.company_identifier == companyId);
        }

        // GET api/<ApproverController>/5
        [HttpGet("{guid}")]
        public Approver Get(string guid)
        {
            return _companyContext.Approvers.FirstOrDefault(s => s.approver_identifier == new Guid(guid));
        }

        // POST api/<ApproverController>
        [HttpPost]
        public Approver Post([FromBody] Approver value)
        {
            value.created_date = DateTime.UtcNow;
            value.created_by = "Application";
            _companyContext.Approvers.Add(value);
            _companyContext.SaveChanges();
            return _companyContext.Approvers.FirstOrDefault(s => s.approver_email == value.approver_email);
        }

        // PUT api/<ApproverController>/5
        [HttpPut("{guid}")]
        public Approver Put(string guid, [FromBody] Approver value)
        {
            var approver = _companyContext.Approvers.FirstOrDefault(s => s.approver_identifier == new Guid(guid));
            if (approver != null)
            {
                value.modified_date = DateTime.UtcNow;
                value.modified_by = "Application";
                _companyContext.Entry<Approver>(approver).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.Approvers.FirstOrDefault(s => s.approver_identifier == new Guid(guid));
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<ApproverController>/5
        [HttpDelete("{guid}")]
        public IEnumerable<Approver> Delete(string guid, string companyId)
        {
            var approver = _companyContext.Approvers.FirstOrDefault(s => s.approver_identifier == new Guid(guid));
            if (approver != null)
            {
                _companyContext.Approvers.Remove(approver);
                _companyContext.SaveChanges();
                return _companyContext.Approvers.Where(x => x.company_identifier == companyId);
            }
            else
            {
                return _companyContext.Approvers.Where(x => x.company_identifier == companyId);
            }
        }
    }
}
