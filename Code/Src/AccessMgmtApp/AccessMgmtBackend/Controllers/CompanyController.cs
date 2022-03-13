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
            return _companyContext.Companies.FirstOrDefault(s => s.company_identifier == new Guid(guid));
        }

        // POST api/<CompanyController>
        [HttpPost]
        public Company Post([FromBody] Company value)
        {
            value.created_date = DateTime.UtcNow;
            value.created_by = "Application";
            _companyContext.Companies.Add(value);
            _companyContext.SaveChanges();
            return _companyContext.Companies.FirstOrDefault(s => s.company_email == value.company_email);
        }

        // PUT api/<CompanyController>/''
        [HttpPut("{guid}")]
        public Company Put(string guid, [FromBody] string value)
        {
            var employee = _companyContext.Companies.FirstOrDefault(s => s.company_identifier == new Guid(guid));
            if (employee != null)
            {
                employee.modified_date = DateTime.UtcNow;
                employee.modified_by = "Application";
                _companyContext.Entry<Company>(employee).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.Companies.FirstOrDefault(s => s.company_identifier == new Guid(guid));
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<CompanyController>/''
        [HttpDelete("{guid}")]
        public IEnumerable<Company> Delete(string guid)
        {
            var student = _companyContext.Companies.FirstOrDefault(s => s.company_identifier == new Guid(guid));
            if (student != null)
            {
                _companyContext.Companies.Remove(student);
                _companyContext.SaveChanges();
                return _companyContext.Companies.Where(x => x.company_identifier == new Guid(guid));
            }
            else
            {
                return _companyContext.Companies.Where(x => x.company_identifier == new Guid(guid));
            }
        }
    }
}
