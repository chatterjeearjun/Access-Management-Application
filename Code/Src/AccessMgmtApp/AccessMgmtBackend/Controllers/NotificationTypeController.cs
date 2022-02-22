using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationTypeController : ControllerBase
    {
        private CompanyContext _companyContext;
        public NotificationTypeController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<NotificationTypeController>
        [HttpGet]
        public IEnumerable<NotificationType> Get()
        {
            return _companyContext.NotificationTypes;
        }

        // GET api/<NotificationTypeController>/5
        [HttpGet("{id}")]
        public NotificationType Get(int id)
        {
            return _companyContext.NotificationTypes.FirstOrDefault(s => s.id == id);
        }

        // POST api/<NotificationTypeController>
        [HttpPost]
        public void Post([FromBody] NotificationType value)
        {
            _companyContext.NotificationTypes.Add(value);
            _companyContext.SaveChanges();
        }

        // PUT api/<NotificationTypeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            var employee = _companyContext.NotificationTypes.FirstOrDefault(s => s.id == id);
            if (employee != null)
            {
                _companyContext.Entry<NotificationType>(employee).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
            }
        }

        // DELETE api/<NotificationTypeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var student = _companyContext.NotificationTypes.FirstOrDefault(s => s.id == id);
            if (student != null)
            {
                _companyContext.NotificationTypes.Remove(student);
                _companyContext.SaveChanges();
            }
        }
    }
}
