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
        [HttpGet("{guid}")]
        public NotificationType Get(string guid)
        {
             return _companyContext.NotificationTypes.FirstOrDefault(s => s.notification_identifier == new Guid(guid));
        }

        // GET api/<NotificationTypeController>/5
        [HttpGet("{companyId}")]
        public IEnumerable<NotificationType> GetByCompany(string companyId)
        {
            return _companyContext.NotificationTypes.Where(s => s.company_identifier == companyId);
        }

        // POST api/<NotificationTypeController>
        [HttpPost]
        public NotificationType Post([FromBody] NotificationType value)
        {
            value.created_date = DateTime.UtcNow;
            value.created_by = "Application";
            _companyContext.NotificationTypes.Add(value);
            _companyContext.SaveChanges();
            return _companyContext.NotificationTypes.FirstOrDefault(s => s.notification_name == value.notification_name);
        }

        // PUT api/<NotificationTypeController>/5
        [HttpPut("{guid}")]
        public NotificationType Put(string guid, [FromBody] NotificationType value)
        {
            var notification = _companyContext.NotificationTypes.FirstOrDefault(s => s.notification_identifier == new Guid(guid));
            if (notification != null)
            {
                value.modified_date = DateTime.UtcNow;
                value.modified_by = "Application";
                _companyContext.Entry<NotificationType>(notification).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.NotificationTypes.FirstOrDefault(s => s.notification_identifier == new Guid(guid));
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<NotificationTypeController>/5
        [HttpDelete("{guid}")]
        public IEnumerable<NotificationType> Delete(string guid, string companyId)
        {
            var notification = _companyContext.NotificationTypes.FirstOrDefault(s => s.notification_identifier == new Guid(guid));
            if (notification != null)
            {
                _companyContext.NotificationTypes.Remove(notification);
                _companyContext.SaveChanges();
                return _companyContext.NotificationTypes.Where(x => x.company_identifier == companyId);
            }
            else
            {
                return _companyContext.NotificationTypes.Where(x => x.company_identifier == companyId);
            }
        }
    }
}
