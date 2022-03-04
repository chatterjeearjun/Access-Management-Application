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
        public IEnumerable<Asset> Get()
        {
            return _companyContext.Assets;
        }

        // GET api/<AssetController>/5
        [HttpGet("{id}")]
        public Asset Get(int id)
        {
            return _companyContext.Assets.FirstOrDefault(s => s.id == id);
        }

        // POST api/<AssetController>
        [HttpPost]
        public void Post([FromBody] Asset value)
        {
            _companyContext.Assets.Add(value);
            _companyContext.SaveChanges();
        }

        // PUT api/<AssetController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Asset value)
        {
            var employee = _companyContext.Assets.FirstOrDefault(s => s.id == id);
            if (employee != null)
            {
                _companyContext.Entry<Asset>(employee).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
            }
        }

        // DELETE api/<AssetController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var student = _companyContext.Assets.FirstOrDefault(s => s.id == id);
            if (student != null)
            {
                _companyContext.Assets.Remove(student);
                _companyContext.SaveChanges();
            }
        }
    }
}
