using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
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
        public Asset Post([FromBody] CreateAsset value)
        {
            var asset = new Asset();
            asset.created_date = DateTime.UtcNow;
            asset.created_by = "Application";
            asset.is_active = true;
            PropertyCopier<CreateAsset, Asset>.Copy(value, asset);
            _companyContext.Assets.Add(asset);
            _companyContext.SaveChanges();
            return _companyContext.Assets.FirstOrDefault(s => s.asset_id == value.asset_id);
        }

        // PUT api/<AssetController>/5
        [HttpPut]
        public Asset Put([FromBody] UpdateAsset value)
        {
            var asset = _companyContext.Assets.FirstOrDefault(s => s.asset_identifier == value.asset_identifier);
            if (asset != null)
            {
                var assetNew = new Asset();
                assetNew.id = asset.id;
                assetNew.created_by = asset.created_by;
                assetNew.created_date = asset.created_date;
                assetNew.modified_date = DateTime.UtcNow;
                assetNew.modified_by = "Application";
                PropertyCopier<UpdateAsset, Asset>.Copy(value, assetNew);
                _companyContext.Entry<Asset>(asset).CurrentValues.SetValues(assetNew);
                _companyContext.SaveChanges();
                return _companyContext.Assets.FirstOrDefault(s => s.asset_identifier == value.asset_identifier);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<AssetController>/5
        [HttpDelete]
        public IEnumerable<Asset> Delete([FromBody] DeleteAsset value)
        {
            var asset = _companyContext.Assets.FirstOrDefault(s => s.asset_identifier == value.asset_identifier);
            if (asset != null)
            {
                _companyContext.AssetToEmployees.RemoveRange(_companyContext.AssetToEmployees.Where(x => x.asset_identifier == value.asset_identifier.ToString()));
                _companyContext.AssetToRoles.RemoveRange(_companyContext.AssetToRoles.Where(x => x.asset_identifier == value.asset_identifier.ToString()));
                _companyContext.AssetToUsers.RemoveRange(_companyContext.AssetToUsers.Where(x => x.asset_identifier == value.asset_identifier.ToString()));
                _companyContext.Assets.Remove(asset);
                _companyContext.SaveChanges();
                return _companyContext.Assets.Where(x => x.company_identifier == value.company_identifier);
            }
            else
            {
                return _companyContext.Assets.Where(x => x.company_identifier == value.company_identifier);
            }
        }
    }
}
