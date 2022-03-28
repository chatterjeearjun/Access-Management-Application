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
    public class CardController : ControllerBase
    {
        private CompanyContext _companyContext;
        public CardController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        [Route("AssetToUsers")]
        [HttpPost]
        public IEnumerable<AppUser> AssetToUsers(string companyId, string assetId)
        {
            var listUsers = new List<AppUser>();

            if (!string.IsNullOrEmpty(companyId) && !string.IsNullOrEmpty(assetId))
            {
                var listOfMappings = _companyContext.AssetToUsers.Where(x => x.company_identifier == companyId && x.asset_identifier == assetId)?
                    .Select(x => x.user_identifier)?.Distinct()?.ToList();
                if (listOfMappings != null && listOfMappings.Count > 0)
                {
                    listUsers = _companyContext.AppUsers.ToList().Where(x => listOfMappings.Any(y => y.ToString() == x.user_identifier.ToString())).ToList();
                }

                return listUsers;
            }
            else
            {
                return null;
            }
        }

        [Route("AssetToEmployees")]
        [HttpPost]
        public IEnumerable<Employee> AssetToEmployees(string companyId, string assetId)
        {
            var listEmployees = new List<Employee>();

            if (!string.IsNullOrEmpty(companyId) && !string.IsNullOrEmpty(assetId))
            {
                var listOfMappings = _companyContext.AssetToEmployees.Where(x => x.company_identifier == companyId && x.asset_identifier == assetId)?
                    .Select(x=>x.employee_identifier)?.Distinct()?.ToList();
                if(listOfMappings != null && listOfMappings.Count>0)
                {
                    listEmployees = _companyContext.Employees.ToList().Where(x => listOfMappings.Any(y=>y.ToString()==x.employee_identifier.ToString())).ToList();
                }
                
                return listEmployees;
            }
            else
            {
                return null;
            }

        }

    }
}
