using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
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
        public IEnumerable<Employee> GetByCompany(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                return _companyContext.Employees.Where(x => x.company_identifier == companyId);
            }
            else
            {
                return null;
            }
            
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{guid}")]
        public Employee Get(string guid)
        {
            return _companyContext.Employees.FirstOrDefault(s => s.employee_identifier == new Guid(guid));
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public Employee Post([FromBody] CreateEmployee value)
        {
            var employee = new Employee();
            employee.created_date = DateTime.UtcNow;
            employee.created_by = "Application";
            employee.is_active = true;
            PropertyCopier<CreateEmployee, Employee>.Copy(value, employee);
            _companyContext.Employees.Add(employee);
            _companyContext.SaveChanges();
            return _companyContext.Employees.FirstOrDefault(s => s.emp_email == value.emp_email);

        }

        // PUT api/<EmployeeController>/5
        [HttpPut]
        public Employee Put([FromBody] UpdateEmployee value)
        {
            var employeeStore = _companyContext.Employees.FirstOrDefault(s => s.employee_identifier == value.employee_identifier);
            if (employeeStore != null)
            {
                var employeeNew = new Employee();
                employeeNew.id = employeeStore.id;
                employeeNew.created_by = employeeStore.created_by;
                employeeNew.created_date = employeeStore.created_date;
                employeeNew.modified_date = DateTime.UtcNow;
                employeeNew.modified_by = "Application";
                PropertyCopier<UpdateEmployee, Employee>.Copy(value, employeeNew);
                _companyContext.Entry<Employee>(employeeStore).CurrentValues.SetValues(employeeNew);
                _companyContext.SaveChanges();
                return _companyContext.Employees.FirstOrDefault(s => s.employee_identifier == value.employee_identifier);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete]
        public IEnumerable<Employee> Delete([FromBody] DeleteEmployee value)
        {
            var employeeStore = _companyContext.Employees.FirstOrDefault(s => s.employee_identifier == value.employee_identifier);
            if (employeeStore != null)
            {
                _companyContext.Employees.Remove(employeeStore);
                _companyContext.SaveChanges();
                return _companyContext.Employees.Where(x => x.company_identifier == value.company_identifier);

            }
            else
            {
                return _companyContext.Employees.Where(x => x.company_identifier == value.company_identifier);
            }
        }
    }
}
