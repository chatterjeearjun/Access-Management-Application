using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
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
        public Company Post([FromBody] CreateCompany value)
        {
            var company = new Company();
            company.created_date = DateTime.UtcNow;
            company.created_by = "Application";
            company.is_active = true;
            PropertyCopier<CreateCompany, Company>.Copy(value, company);
            _companyContext.Companies.Add(company);
            _companyContext.SaveChanges();
            return _companyContext.Companies.FirstOrDefault(s => s.company_email == value.company_email);
        }

        // PUT api/<CompanyController>/''
        [HttpPut]
        public Company Put([FromBody] UpdateCompany value)
        {
            var company = _companyContext.Companies.FirstOrDefault(s => s.company_identifier == value.company_identifier);
            if (company != null)
            {
                var companyNew = new Company();
                companyNew.id = company.id;
                companyNew.created_by = company.created_by;
                companyNew.created_date = company.created_date;
                companyNew.modified_date = DateTime.UtcNow;
                companyNew.modified_by = "Application";
                PropertyCopier<UpdateCompany, Company>.Copy(value, companyNew);
                _companyContext.Entry<Company>(company).CurrentValues.SetValues(companyNew);
                _companyContext.SaveChanges();
                return _companyContext.Companies.FirstOrDefault(s => s.company_identifier == value.company_identifier);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<CompanyController>/''
        [HttpDelete]
        public IEnumerable<Company> Delete([FromBody] DeleteCompany value)
        {
            var student = _companyContext.Companies.FirstOrDefault(s => s.company_identifier == value.company_identifier);
            if (student != null)
            {
                _companyContext.Companies.Remove(student);
                _companyContext.SaveChanges();
                return _companyContext.Companies.Where(x => x.company_identifier == value.company_identifier);
            }
            else
            {
                return _companyContext.Companies.Where(x => x.company_identifier == value.company_identifier);
            }
        }
    }
}
