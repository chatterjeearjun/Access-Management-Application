using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SentNotificationController : ControllerBase
    {
        private CompanyContext _companyContext;
        public SentNotificationController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<SentNotificationController>
        [HttpGet]
        public IEnumerable<SentNotification> Get()
        {
            return _companyContext.SentNotifications;
        }

        // GET api/<SentNotificationController>/5
        [HttpGet("{id}")]
        public SentNotification Get(int id)
        {
            return _companyContext.SentNotifications.FirstOrDefault(s => s.id == id);
        }

        // POST api/<SentNotificationController>
        [HttpPost]
        public void Post([FromBody] SentNotification value)
        {
            _companyContext.SentNotifications.Add(value);
            _companyContext.SaveChanges();
        }

        // PUT api/<SentNotificationController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            var employee = _companyContext.SentNotifications.FirstOrDefault(s => s.id == id);
            if (employee != null)
            {
                _companyContext.Entry<SentNotification>(employee).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
            }
        }

        // DELETE api/<SentNotificationController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var student = _companyContext.SentNotifications.FirstOrDefault(s => s.id == id);
            if (student != null)
            {
                _companyContext.SentNotifications.Remove(student);
                _companyContext.SaveChanges();
            }
        }
    }
}
