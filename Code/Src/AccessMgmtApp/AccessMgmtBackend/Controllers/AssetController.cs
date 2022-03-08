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

        // GET: api/<AssetController>
        [HttpGet]
        public IEnumerable<Asset> Get(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                return _companyContext.Assets.Where(x => x.company_id == Convert.ToInt32(companyId));
            }
            else
            {
                return null;
            }
        }

        // GET api/<AssetController>/5
        [HttpGet("{id}")]
        public Asset Get(int id)
        {
            return _companyContext.Assets.FirstOrDefault(s => s.id == id);
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
        [HttpPut("{id}")]
        public Asset Put(int id, [FromBody] Asset value)
        {
            var asset = _companyContext.Assets.FirstOrDefault(s => s.id == id);
            if (asset != null)
            {
                value.modified_date = DateTime.UtcNow;
                value.modified_by = "Application";
                _companyContext.Entry<Asset>(asset).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.Assets.FirstOrDefault(s => s.id == id);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<AssetController>/5
        [HttpDelete("{id}")]
        public IEnumerable<Asset> Delete(int id)
        {
            var asset = _companyContext.Assets.FirstOrDefault(s => s.id == id);
            if (asset != null)
            {
                _companyContext.Assets.Remove(asset);
                _companyContext.SaveChanges();
                return _companyContext.Assets.Where(x => x.company_id == asset.company_id);
            }
            else
            {
                return null;
            }
        }
    }
}
