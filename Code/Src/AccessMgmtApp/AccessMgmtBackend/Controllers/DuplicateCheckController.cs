using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace AccessMgmtBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DuplicateCheckController : ControllerBase
    {

        private readonly ILogger<DuplicateCheckController> _logger;
        private CompanyContext _companyContext;

        public DuplicateCheckController(ILogger<DuplicateCheckController> logger, CompanyContext companyContext)
        {
            _logger = logger;
            _companyContext = companyContext;
        }

        [HttpGet]
        public bool GET(string EmployeeEmail, string CompanyIdentifier)
        {
            if (!string.IsNullOrEmpty(EmployeeEmail) && !string.IsNullOrEmpty(CompanyIdentifier))
            {
                var existingApprover = _companyContext.Employees.Where(x => x.company_identifier.ToLower() == CompanyIdentifier.Trim().ToLower())
                    .FirstOrDefault(s => s.emp_email.ToLower() == EmployeeEmail.Trim().ToLower());
                return existingApprover != null ? true : false;
            }
            else { return false; }

        }
        [HttpPost]
        public bool POST(string ApproverEmail, string CompanyIdentifier)
        {
            if (!string.IsNullOrEmpty(ApproverEmail) && !string.IsNullOrEmpty(CompanyIdentifier))
            {
                var existingApprover = _companyContext.Approvers.Where(x=>x.company_identifier.ToLower() == CompanyIdentifier.Trim().ToLower())
                    .FirstOrDefault(s => s.approver_email.ToLower() == ApproverEmail.Trim().ToLower());
                return existingApprover != null ?true:false;
            }
            else { return false; }
        }
    }
}