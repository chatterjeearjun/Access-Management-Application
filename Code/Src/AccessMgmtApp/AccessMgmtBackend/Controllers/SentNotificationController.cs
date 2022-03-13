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
        [HttpGet("{companyId}")]
        public IEnumerable<SentNotification> GetByCompany(string companyId)
        {
            return _companyContext.SentNotifications.Where(x => x.company_identifier == companyId);
        }

        // GET api/<SentNotificationController>/5
        [HttpGet("{guid}")]
        public SentNotification Get(string guid)
        {
            return _companyContext.SentNotifications.FirstOrDefault(s => s.notification_sent_identifier == new Guid(guid));
        }

        // POST api/<SentNotificationController>
        [HttpPost]
        public SentNotification Post([FromBody] SentNotification value)
        {
            value.created_date = DateTime.UtcNow;
            value.created_by = "Application";
            _companyContext.SentNotifications.Add(value);
            _companyContext.SaveChanges();
            return _companyContext.SentNotifications.FirstOrDefault(s => s.sent_notification_name == value.sent_notification_name);
        }

        // PUT api/<SentNotificationController>/5
        [HttpPut("{guid}")]
        public SentNotification Put(string guid, [FromBody] SentNotification value)
        {
            var notification = _companyContext.SentNotifications.FirstOrDefault(s => s.notification_sent_identifier == new Guid(guid));
            if (notification != null)
            {
                notification.modified_date = DateTime.UtcNow;
                notification.modified_by = "Application";
                _companyContext.Entry<SentNotification>(notification).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
                return _companyContext.SentNotifications.FirstOrDefault(s => s.notification_sent_identifier == new Guid(guid));
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<SentNotificationController>/5
        [HttpDelete("{guid}")]
        public IEnumerable<SentNotification> Delete(string guid, string companyId)
        {
            var notification = _companyContext.SentNotifications.FirstOrDefault(s => s.notification_sent_identifier == new Guid(guid));
            if (notification != null)
            {
                _companyContext.SentNotifications.Remove(notification);
                _companyContext.SaveChanges();
                return _companyContext.SentNotifications.Where(x => x.company_identifier == companyId);
            }
            else {
                return _companyContext.SentNotifications.Where(x => x.company_identifier == companyId);
            }
        }
    }
}
