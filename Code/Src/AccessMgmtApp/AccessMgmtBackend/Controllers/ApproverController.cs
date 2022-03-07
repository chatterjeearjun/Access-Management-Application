using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApproverController : ControllerBase
    {
        private CompanyContext _companyContext;
        public ApproverController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<ApproverController>
        [HttpGet]
        public IEnumerable<Approver> Get()
        {
            return _companyContext.Approvers;
        }

        // GET api/<ApproverController>/5
        [HttpGet("{id}")]
        public Approver Get(int id)
        {
            return _companyContext.Approvers.FirstOrDefault(s => s.id == id);
        }

        // POST api/<ApproverController>
        [HttpPost]
        public void Post([FromBody] Approver value)
        {
            _companyContext.Approvers.Add(value);
            _companyContext.SaveChanges();
        }

        // PUT api/<ApproverController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Approver value)
        {
            var employee = _companyContext.Approvers.FirstOrDefault(s => s.id == id);
            if (employee != null)
            {
                _companyContext.Entry<Approver>(employee).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
            }
        }

        // DELETE api/<ApproverController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var student = _companyContext.Approvers.FirstOrDefault(s => s.id == id);
            if (student != null)
            {
                _companyContext.Approvers.Remove(student);
                _companyContext.SaveChanges();
            }
        }
    }
}
