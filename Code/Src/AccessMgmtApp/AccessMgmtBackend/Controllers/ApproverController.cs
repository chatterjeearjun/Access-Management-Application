using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models.ApproverModels;
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
        [HttpGet]
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
        public Approver Post([FromBody] CreateApprover value)
        {
            var approver = new Approver();
            approver.created_date = DateTime.UtcNow;
            approver.created_by = "Application";
            approver.is_active = true;            
            PropertyCopier<CreateApprover, Approver>.Copy(value, approver);
            _companyContext.Approvers.Add(approver);
            _companyContext.SaveChanges();
            return _companyContext.Approvers.FirstOrDefault(s => s.approver_email == value.approver_email);
        }

        // PUT api/<ApproverController>/5
        [HttpPut]
        public Approver Put([FromBody] UpdateApprover value)
        {
            var approver = _companyContext.Approvers.FirstOrDefault(s => s.approver_identifier == value.approver_identifier);
            if (approver != null)
            {
                var approverNew = new Approver();
                approverNew.id = approver.id;
                approverNew.created_by = approver.created_by;
                approverNew.created_date = approver.created_date;
                approverNew.modified_date = DateTime.UtcNow;
                approverNew.modified_by = "Application";                
                PropertyCopier<UpdateApprover, Approver>.Copy(value, approverNew);
                _companyContext.Entry<Approver>(approver).CurrentValues.SetValues(approverNew);
                _companyContext.SaveChanges();
                return _companyContext.Approvers.FirstOrDefault(s => s.approver_identifier == value.approver_identifier);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<ApproverController>/5
        [HttpDelete]
        public IEnumerable<Approver> Delete([FromBody] DeleteApprover deleteApprover)
        {
            var approver = _companyContext.Approvers.FirstOrDefault(s => s.approver_identifier == deleteApprover.approver_identifier);
            if (approver != null)
            {
                _companyContext.Approvers.Remove(approver);
                _companyContext.SaveChanges();
                return _companyContext.Approvers.Where(x => x.company_identifier == deleteApprover.company_identifier);
            }
            else
            {
                return _companyContext.Approvers.Where(x => x.company_identifier == deleteApprover.company_identifier);
            }
        }
    }
}
