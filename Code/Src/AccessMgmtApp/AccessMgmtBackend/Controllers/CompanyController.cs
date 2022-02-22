using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {

        private CompanyContext _companyContext;
        public CompanyController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<CompanyController>
        [HttpGet]
        public IEnumerable<Company> Get()
        {
            return _companyContext.Companies;
        }

        // GET api/<CompanyController>/''
        [HttpGet("{guid}")]
        public Company Get(string guid)
        {
            return _companyContext.Companies.FirstOrDefault(s => s.company_guid == guid);
        }

        // POST api/<CompanyController>
        [HttpPost]
        public void Post([FromBody] Company value)
        {
            _companyContext.Companies.Add(value);
            _companyContext.SaveChanges();
        }

        // PUT api/<CompanyController>/''
        [HttpPut("{guid}")]
        public void Put(string guid, [FromBody] string value)
        {
            var employee = _companyContext.Companies.FirstOrDefault(s => s.company_guid == guid);
            if (employee != null)
            {
                _companyContext.Entry<Company>(employee).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
            }
        }

        // DELETE api/<CompanyController>/''
        [HttpDelete("{guid}")]
        public void Delete(string guid)
        {
            var student = _companyContext.Companies.FirstOrDefault(s => s.company_guid == guid);
            if (student != null)
            {
                _companyContext.Companies.Remove(student);
                _companyContext.SaveChanges();
            }
        }
    }
}
