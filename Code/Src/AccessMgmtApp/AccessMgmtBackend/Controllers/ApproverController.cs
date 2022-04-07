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
        public IEnumerable<ViewApprover> GetByCompany(string companyId)
        {
            List<ViewApprover> viewApprovers = new List<ViewApprover>();
            var listOfApprovers = _companyContext.Approvers.Where(x => x.company_identifier == companyId).ToList();
            foreach (var i in listOfApprovers)
            {
                ViewApprover viewApprover = new ViewApprover();
                i.approver_role = String.Join(",",
                _companyContext.ApproverToRoles.Where(x => x.company_identifier == companyId && x.approver_identifier == i.approver_identifier.ToString()).
                Select(x => x.role_identifier));
                PropertyCopier<Approver, ViewApprover>.Copy(i, viewApprover);
                if (!string.IsNullOrEmpty(i.approver_role))
                {
                    string[] roles = i.approver_role.Split(',');
                    foreach (var role in roles)
                    {
                        viewApprover.approver_role_name = String.Join(",", viewApprover.approver_role_name,
                _companyContext.CompanyRoles.FirstOrDefault(x => x.company_identifier == i.company_identifier && x.role_identifier.ToString() == role)?.role_name);
                    }
                    viewApprover.approver_role_name = viewApprover.approver_role_name.TrimStart(',');
                }
                viewApprovers.Add(viewApprover);
            }
            return viewApprovers;
        }

        // GET api/<ApproverController>/5
        [HttpGet("{guid}")]
        public ViewApprover Get(string guid)
        {
            ViewApprover viewApprover = new ViewApprover();
            var approver = _companyContext.Approvers.FirstOrDefault(s => s.approver_identifier == new Guid(guid));
            if (approver != null)
            {
                approver.approver_role = String.Join(",",
                _companyContext.ApproverToRoles.Where(x => x.company_identifier == approver.company_identifier && x.approver_identifier == approver.approver_identifier.ToString()).
                Select(x => x.role_identifier));                
                PropertyCopier<Approver, ViewApprover>.Copy(approver, viewApprover);
                if (!string.IsNullOrEmpty(approver.approver_role))
                {
                    string[] roles = approver.approver_role.Split(',');
                    foreach (var role in roles)
                    {
                        viewApprover.approver_role_name = String.Join(",", viewApprover.approver_role_name,
                _companyContext.CompanyRoles.FirstOrDefault(x => x.company_identifier == approver.company_identifier && x.role_identifier.ToString() == role)?.role_name);
                    }
                    viewApprover.approver_role_name = viewApprover.approver_role_name.TrimStart(',');
                }
            }
            return viewApprover;
        }

        // POST api/<ApproverController>
        [HttpPost]
        public ViewApprover Post([FromBody] CreateApprover value)
        {
            ViewApprover viewApprover = new ViewApprover();
            var approver = new Approver();
            approver.created_date = DateTime.UtcNow;
            approver.created_by = "Application";
            approver.is_approved = true;
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
            var newapprover = _companyContext.Approvers.FirstOrDefault(s => s.approver_email == value.approver_email);
            PropertyCopier<Approver, ViewApprover>.Copy(newapprover, viewApprover);
            if (!string.IsNullOrEmpty(newapprover.approver_role))
            {
                string[] roles = newapprover.approver_role.Split(',');
                foreach (var role in roles)
                {
                    viewApprover.approver_role_name = String.Join(",", viewApprover.approver_role_name,
            _companyContext.CompanyRoles.FirstOrDefault(x => x.company_identifier == newapprover.company_identifier && x.role_identifier.ToString() == role)?.role_name);
                }
                viewApprover.approver_role_name = viewApprover.approver_role_name.TrimStart(',');
            }
            return viewApprover;
        }

        // PUT api/<ApproverController>/5
        [HttpPut]
        public ViewApprover Put([FromBody] UpdateApprover value)
        {
            var approver = _companyContext.Approvers.FirstOrDefault(s => s.approver_identifier == value.approver_identifier);
            if (approver != null)
            {
                ViewApprover viewApprover = new ViewApprover();
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
                var newapprover = _companyContext.Approvers.FirstOrDefault(s => s.approver_identifier == value.approver_identifier);
                PropertyCopier<Approver, ViewApprover>.Copy(newapprover, viewApprover);
                if (!string.IsNullOrEmpty(newapprover.approver_role))
                {
                    string[] roles = newapprover.approver_role.Split(',');
                    foreach (var role in roles)
                    {
                        viewApprover.approver_role_name = String.Join(",", viewApprover.approver_role_name,
                _companyContext.CompanyRoles.FirstOrDefault(x => x.company_identifier == newapprover.company_identifier && x.role_identifier.ToString() == role)?.role_name);
                    }
                    viewApprover.approver_role_name = viewApprover.approver_role_name.TrimStart(',');
                }
                return viewApprover;
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<ApproverController>/5
        [HttpDelete]
        public IEnumerable<ViewApprover> Delete([FromBody] DeleteApprover deleteApprover)
        {
            List<ViewApprover> viewApprovers = new List<ViewApprover>();
            var approver = _companyContext.Approvers.FirstOrDefault(s => s.approver_identifier == deleteApprover.approver_identifier);
            if (approver != null)
            {
                approver.is_active = false;
                approver.modified_date = DateTime.UtcNow;
                approver.modified_by = "Application";
                _companyContext.Approvers.Update(approver);
                _companyContext.ApproverToRoles.UpdateRange(_companyContext.ApproverToRoles.Where
                    (x => x.company_identifier == approver.company_identifier && x.approver_identifier == approver.approver_identifier.ToString()).ToList()
                   .Select(x => { x.is_active = false; x.modified_date = DateTime.UtcNow; x.modified_by = "Application"; return x; }));
                _companyContext.SaveChanges();
                var listOfApprovers = _companyContext.Approvers.Where(x => x.company_identifier == deleteApprover.company_identifier).ToList();

                foreach (var i in listOfApprovers)
                {
                    ViewApprover viewApprover = new ViewApprover();
                    i.approver_role = String.Join(",",
                    _companyContext.ApproverToRoles.Where(x => x.company_identifier == i.company_identifier && x.approver_identifier == i.approver_identifier.ToString()).
                    Select(x => x.role_identifier));
                    PropertyCopier<Approver, ViewApprover>.Copy(i, viewApprover);
                    if (!string.IsNullOrEmpty(i.approver_role))
                    {
                        string[] roles = i.approver_role.Split(',');
                        foreach (var role in roles)
                        {
                            viewApprover.approver_role_name = String.Join(",", viewApprover.approver_role_name,
                    _companyContext.CompanyRoles.FirstOrDefault(x => x.company_identifier == i.company_identifier && x.role_identifier.ToString() == role)?.role_name);
                        }
                        viewApprover.approver_role_name = viewApprover.approver_role_name.TrimStart(',');
                    }
                    viewApprovers.Add(viewApprover);
                }
                return viewApprovers;
            }
            else
            {
                var listOfApprovers = _companyContext.Approvers.Where(x => x.company_identifier == deleteApprover.company_identifier).ToList();

                foreach (var i in listOfApprovers)
                {
                    ViewApprover viewApprover = new ViewApprover();
                    i.approver_role = String.Join(",",
                    _companyContext.ApproverToRoles.Where(x => x.company_identifier == i.company_identifier && x.approver_identifier == i.approver_identifier.ToString()).
                    Select(x => x.role_identifier));
                    PropertyCopier<Approver, ViewApprover>.Copy(i, viewApprover);
                    if (!string.IsNullOrEmpty(i.approver_role))
                    {
                        string[] roles = i.approver_role.Split(',');
                        foreach (var role in roles)
                        {
                            viewApprover.approver_role_name = String.Join(",", viewApprover.approver_role_name,
                    _companyContext.CompanyRoles.FirstOrDefault(x => x.company_identifier == i.company_identifier && x.role_identifier.ToString() == role)?.role_name);
                        }
                        viewApprover.approver_role_name = viewApprover.approver_role_name.TrimStart(',');
                    }
                    viewApprovers.Add(viewApprover);
                }
                return viewApprovers;
            }
        }
    }
}
