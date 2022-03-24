using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models;
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
            var listOfApprovers = _companyContext.Approvers.Where(x => x.company_identifier == companyId).ToList();
            foreach (var i in listOfApprovers)
            {
                i.approver_role = String.Join(",",
                _companyContext.ApproverToRoles.Where(x => x.company_identifier == companyId && x.approver_identifier == i.approver_identifier.ToString()).
                Select(x => x.role_identifier));
            }
            return listOfApprovers;
        }

        // GET api/<ApproverController>/5
        [HttpGet("{guid}")]
        public Approver Get(string guid)
        {
            var approver = _companyContext.Approvers.FirstOrDefault(s => s.approver_identifier == new Guid(guid));
            if (approver != null)
            {
                approver.approver_role = String.Join(",",
                _companyContext.ApproverToRoles.Where(x => x.company_identifier == approver.company_identifier && x.approver_identifier == approver.approver_identifier.ToString()).
                Select(x => x.role_identifier));
            }
            return approver;
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
            if (!string.IsNullOrEmpty(approver.approver_role))
            {
                string[] roles = approver.approver_role.Split(',');
                foreach (var role in roles)
                {
                    _companyContext.ApproverToRoles.Add(new ApproverToRole
                    {
                        id = 0,
                        company_identifier = approver.company_identifier,
                        approver_identifier = approver.approver_identifier.ToString(),
                        role_identifier = role.ToString(),
                        is_active = true,
                        created_date = DateTime.UtcNow,
                        created_by = "Application"
                    });
                }
            }
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
                _companyContext.ApproverToRoles.RemoveRange(_companyContext.ApproverToRoles.Where
                   (x => x.company_identifier == approver.company_identifier && x.approver_identifier == approver.approver_identifier.ToString()));
                if (!string.IsNullOrEmpty(approver.approver_role))
                {
                    string[] roles = approver.approver_role.Split(',');
                    foreach (var role in roles)
                    {
                        _companyContext.ApproverToRoles.Add(new ApproverToRole
                        {
                            id = 0,
                            company_identifier = approver.company_identifier,
                            approver_identifier = approver.approver_identifier.ToString(),
                            role_identifier = role.ToString(),
                            is_active = true,
                            created_date = DateTime.UtcNow,
                            created_by = "Application"
                        });
                    }
                }
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
                _companyContext.ApproverToRoles.RemoveRange(_companyContext.ApproverToRoles.Where
                    (x => x.company_identifier == approver.company_identifier && x.approver_identifier == approver.approver_identifier.ToString()));
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
