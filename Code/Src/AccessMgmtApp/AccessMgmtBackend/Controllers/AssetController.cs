using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController : ControllerBase
    {
        private CompanyContext _companyContext;
        public AssetController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<AssetController>/GetByCompany/{companyId}
        [HttpGet]
        public IEnumerable<Asset> GetByCompany(string companyId)
        {
            return _companyContext.Assets.Where(x => x.company_identifier == companyId);
        }

        // GET api/<AssetController>/{guid}
        [HttpGet("{guid}")]
        public Asset Get(string guid)
        {
            return _companyContext.Assets.FirstOrDefault(s => s.asset_identifier == new Guid(guid));
        }

        // POST api/<AssetController>
        [HttpPost]
        public Asset Post([FromBody] Asset value)
        {
            value.created_date = DateTime.UtcNow;
            value.created_by = "Application";
            _companyContext.Assets.Add(value);
            _companyContext.SaveChanges();
            return _companyContext.Assets.FirstOrDefault(s => s.asset_id == value.asset_id);
        }

        // PUT api/<AssetController>/5
        [HttpPut("{guid}")]
        public Asset Put(string guid, [FromBody] Asset value)
        {
            var asset = _companyContext.Assets.FirstOrDefault(s => s.asset_identifier == new Guid(guid));
            if (asset != null)
            {
                value.modified_date = DateTime.UtcNow;
                value.modified_by = "Application";
                _companyContext.Entry<Asset>(asset).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.Assets.FirstOrDefault(s => s.asset_identifier == new Guid(guid));
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<AssetController>/5
        [HttpDelete("{guid}")]
        public IEnumerable<Asset> Delete(string guid, string companyId)
        {
            var asset = _companyContext.Assets.FirstOrDefault(s => s.asset_identifier == new Guid(guid));
            if (asset != null)
            {
                _companyContext.Assets.Remove(asset);
                _companyContext.SaveChanges();
                return _companyContext.Assets.Where(x => x.company_identifier == companyId);
            }
            else
            {
                return _companyContext.Assets.Where(x => x.company_identifier == companyId);
            }
        }
    }
}
