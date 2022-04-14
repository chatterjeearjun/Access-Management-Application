using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private CompanyContext _companyContext;
        public DashboardController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<DashboardController>
        [HttpGet]
        public DashboardView GetByCompany(string companyId)
        {
            DashboardView dashboardView = new DashboardView();

            if (!string.IsNullOrEmpty(companyId))
            {
                var listEmployees = _companyContext.Employees.Where(x => x.company_identifier == companyId).ToList();
                if (listEmployees != null && listEmployees.Count > 0)
                {
                    dashboardView.TotalEmployees = listEmployees.Where(x => x.is_active).Count();
                    dashboardView.ApprovedEmployees = listEmployees.Where(x => x.is_active && x.is_approved == true).Count();
                    dashboardView.OverdueEmployees = listEmployees.Where(x => x.is_active && x.emp_approval_overdue < DateTime.UtcNow).Count();
                    dashboardView.ExpiredEmployees = listEmployees.Where(x => x.is_active && x.emp_relieving_date < DateTime.UtcNow).Count();
                    dashboardView.TopPendingEmployees = listEmployees.Where(x => x.is_active == true && x.is_approved == false)
                        .OrderByDescending(x => x.created_date).Take(5);
                    int lastmonthActiveemployees = listEmployees.Where(x => x.is_active && x.created_date < DateTime.UtcNow.AddMonths(-1)).Count();
                    int latestActiveemployees = listEmployees.Where(x => x.is_active).Count();
                    int difference = latestActiveemployees - lastmonthActiveemployees;
                    if (difference > 0)
                    {
                        dashboardView.MonthlyEmployeeCountChanges = difference + " Increased";
                    }
                    else
                    {
                        dashboardView.MonthlyEmployeeCountChanges = difference + " Decreased";
                    }
                    dashboardView.MonthlyEmployeeAdded = listEmployees.Where(x => x.is_active && x.created_date > DateTime.UtcNow.AddMonths(-1)).Count();
                    dashboardView.YearlyEmployeeAdded = listEmployees.Where(x => x.is_active && x.created_date > DateTime.UtcNow.AddYears(-1)).Count();
                    dashboardView.PendingEmployees = listEmployees.Where(x => x.is_active == true && x.is_approved == false).Count();
                    dashboardView.RejectedEmployees = 0;//Needs to be developed
                    dashboardView.ApprovedEmployeePercentage = (dashboardView.ApprovedEmployees / dashboardView.TotalEmployees) * 100;
                    dashboardView.AuditCompletedPercentage = 0;//Needs to be developed
                    dashboardView.TicketClosurePercentage = 0;//Needs to be developed

                }
                var listAssets = _companyContext.Assets.Where(x => x.company_identifier == companyId).ToList();
                if (listAssets != null && listAssets.Count > 0)
                {
                    dashboardView.TotalAssets = listAssets.Where(x => x.is_active).Count();
                    dashboardView.ExpiredAssets = listAssets.Where(x => x.is_active && x.alocation_end_date < DateTime.UtcNow).Count();
                    int lastmonthActiveAssets = listAssets.Where(x => x.is_active && x.created_date < DateTime.UtcNow.AddMonths(-1)).Count();
                    int latestActiveAssets = listAssets.Where(x => x.is_active).Count();
                    int difference = latestActiveAssets - lastmonthActiveAssets;
                    if (difference > 0)
                    {
                        dashboardView.MonthlyAssetCountChanges = difference + " Increased";
                    }
                    else
                    {
                        dashboardView.MonthlyAssetCountChanges = difference + " Decreased";
                    }
                }
                var approverRoles = _companyContext.ApproverToRoles.Where(x => x.company_identifier == companyId).ToList();
                var assetEmployees = _companyContext.AssetToEmployees.Where(x => x.company_identifier == companyId).ToList();
                var assetRoles = _companyContext.AssetToRoles.Where(x => x.company_identifier == companyId).ToList();
                var assetUsers = _companyContext.AssetToUsers.Where(x => x.company_identifier == companyId).ToList();
                var employeeGroups = _companyContext.EmployeeToGroups.Where(x => x.company_identifier == companyId).ToList();
                var employeeRoles = _companyContext.EmployeeToRoles.Where(x => x.company_identifier == companyId).ToList();
                var groupRoles = _companyContext.GroupToRoles.Where(x => x.company_identifier == companyId).ToList();
                var groupUsers = _companyContext.GroupToUsers.Where(x => x.company_identifier == companyId).ToList();
                var roleToUsers = _companyContext.RoleToUsers.Where(x => x.company_identifier == companyId).ToList();
                
                
                dashboardView.ApprovedApprovals = approverRoles.Where(x=>x.is_approved == true).Count()+
                    assetEmployees.Where(x => x.is_approved == true).Count() +
                    assetRoles.Where(x => x.is_approved == true).Count() +
                    assetUsers.Where(x => x.is_approved == true).Count() +
                    employeeGroups.Where(x => x.is_approved == true).Count() +
                    employeeRoles.Where(x => x.is_approved == true).Count() +
                    groupRoles.Where(x => x.is_approved == true).Count() +
                    groupUsers.Where(x => x.is_approved == true).Count() +
                    roleToUsers.Where(x => x.is_approved == true).Count();

                dashboardView.PendingApprovals = approverRoles.Where(x => x.is_approved == false).Count() +
                    assetEmployees.Where(x => x.is_approved == false).Count() +
                    assetRoles.Where(x => x.is_approved == false).Count() +
                    assetUsers.Where(x => x.is_approved == false).Count() +
                    employeeGroups.Where(x => x.is_approved == false).Count() +
                    employeeRoles.Where(x => x.is_approved == false).Count() +
                    groupRoles.Where(x => x.is_approved == false).Count() +
                    groupUsers.Where(x => x.is_approved == false).Count() +
                    roleToUsers.Where(x => x.is_approved == false).Count();

                dashboardView.TotalApprovals = dashboardView.ApprovedApprovals + dashboardView.PendingApprovals;

            }

            return dashboardView;
        }


    }
}
