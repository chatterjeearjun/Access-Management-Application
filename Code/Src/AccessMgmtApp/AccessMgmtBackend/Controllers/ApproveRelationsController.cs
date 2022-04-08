using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApproveRelationsController : ControllerBase
    {
        private CompanyContext _companyContext;
        public ApproveRelationsController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        //https://localhost:5001/api/ApproveRelations/AssetToUsers?companyId=121&assetId=212&UserId=12
        [Route("AssetToUsers")]
        [HttpGet]
        public bool AssetToUsers(string companyId, string assetId, string UserId)
        {
            if (!string.IsNullOrEmpty(companyId) && !string.IsNullOrEmpty(assetId) && !string.IsNullOrEmpty(UserId))
            {
                var assetToUser = _companyContext.AssetToUsers.FirstOrDefault(x => x.company_identifier == companyId && x.asset_identifier == assetId && x.user_identifier == UserId);
                if (assetToUser != null)
                {
                    assetToUser.is_approved = true;
                    assetToUser.modified_date = DateTime.UtcNow;
                    assetToUser.modified_by = "Application";
                    _companyContext.AssetToUsers.Attach(assetToUser);
                    _companyContext.Entry(assetToUser).Property(x => x.is_approved).IsModified = true;
                    _companyContext.Entry(assetToUser).Property(x => x.modified_date).IsModified = true;
                    _companyContext.Entry(assetToUser).Property(x => x.modified_by).IsModified = true;
                    _companyContext.SaveChanges();
                    return true;
                }
                return false;
            }
            else
            {
                return false;
            }
        }

        [Route("AssetToRoles")]
        [HttpGet]
        public bool AssetToRoles(string companyId, string assetId, string RoleId)
        {
            if (!string.IsNullOrEmpty(companyId) && !string.IsNullOrEmpty(assetId) && !string.IsNullOrEmpty(RoleId))
            {
                var assetToRole = _companyContext.AssetToRoles.FirstOrDefault(x => x.company_identifier == companyId && x.asset_identifier == assetId && x.role_identifier == RoleId);
                if (assetToRole != null)
                {
                    assetToRole.is_approved = true;
                    assetToRole.modified_date = DateTime.UtcNow;
                    assetToRole.modified_by = "Application";
                    _companyContext.AssetToRoles.Attach(assetToRole);
                    _companyContext.Entry(assetToRole).Property(x => x.is_approved).IsModified = true;
                    _companyContext.Entry(assetToRole).Property(x => x.modified_date).IsModified = true;
                    _companyContext.Entry(assetToRole).Property(x => x.modified_by).IsModified = true;
                    _companyContext.SaveChanges();
                    return true;
                }
                return false;
            }
            else
            {
                return false;
            }
        }

        [Route("AssetToEmployees")]
        [HttpGet]
        public bool AssetToEmployees(string companyId, string assetId, string EmployeeId)
        {
            if (!string.IsNullOrEmpty(companyId) && !string.IsNullOrEmpty(assetId) && !string.IsNullOrEmpty(EmployeeId))
            {
                var assetToEmployee = _companyContext.AssetToEmployees.FirstOrDefault(x => x.company_identifier == companyId && x.asset_identifier == assetId && x.employee_identifier == EmployeeId);
                if (assetToEmployee != null)
                {
                    assetToEmployee.is_approved = true;
                    assetToEmployee.modified_date = DateTime.UtcNow;
                    assetToEmployee.modified_by = "Application";
                    _companyContext.AssetToEmployees.Attach(assetToEmployee);
                    _companyContext.Entry(assetToEmployee).Property(x => x.is_approved).IsModified = true;
                    _companyContext.Entry(assetToEmployee).Property(x => x.modified_date).IsModified = true;
                    _companyContext.Entry(assetToEmployee).Property(x => x.modified_by).IsModified = true;
                    _companyContext.SaveChanges();
                    return true;
                }
                return false;
            }
            else
            {
                return false;
            }
        }


    }
}
