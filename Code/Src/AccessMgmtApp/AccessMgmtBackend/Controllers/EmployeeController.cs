using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = "Bearer")]
    public class EmployeeController : ControllerBase
    {
        private CompanyContext _companyContext;

        public EmployeeController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        /// <summary>
        /// GET: api/<EmployeeController>
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Employee> Get(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                return _companyContext.Employees.Where(x => x.company_id == Convert.ToInt32(companyId));
            }
            else
            {
                return null;
            }
            
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            return _companyContext.Employees.FirstOrDefault(s => s.id == id);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public Employee Post([FromBody] Employee value)
        {
            value.created_date = DateTime.UtcNow;
            value.created_by = "Application";
            _companyContext.Employees.Add(value);
            _companyContext.SaveChanges();
            return _companyContext.Employees.FirstOrDefault(s => s.emp_email == value.emp_email);

        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public Employee Put(int id, [FromBody] Employee value)
        {
            var employeeStore = _companyContext.Employees.FirstOrDefault(s => s.id == id);
            if (employeeStore != null)
            {
                value.modified_date = DateTime.UtcNow;
                value.modified_by = "Application";
                _companyContext.Entry<Employee>(employeeStore).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.Employees.FirstOrDefault(s => s.id == id);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public IEnumerable<Employee> Delete(int id)
        {
            var employeeStore = _companyContext.Employees.FirstOrDefault(s => s.id == id);
            if (employeeStore != null)
            {
                _companyContext.Employees.Remove(employeeStore);
                _companyContext.SaveChanges();
                return _companyContext.Employees.Where(x => x.company_id == employeeStore.company_id);

            }
            else
            {
                return null;
            }
        }
    }
}
