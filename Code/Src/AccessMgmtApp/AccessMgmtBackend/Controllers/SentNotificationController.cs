using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
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
        public IEnumerable<SentNotification> GetByCompany(string companyId)
        {
            return _companyContext.SentNotifications.Where(x => x.company_identifier == companyId).ToList();
        }

        // GET api/<SentNotificationController>/5
        [HttpGet("{guid}")]
        public SentNotification Get(string guid)
        {
            return _companyContext.SentNotifications.FirstOrDefault(s => s.notification_sent_identifier == new Guid(guid));
        }

        // POST api/<SentNotificationController>
        [HttpPost]
        public SentNotification Post([FromBody] CreateSentNotification value)
        {
            var sentNotification = new SentNotification();
            sentNotification.created_date = DateTime.UtcNow;
            sentNotification.created_by = "Application";
            sentNotification.is_approved = true;
            PropertyCopier<CreateSentNotification, SentNotification>.Copy(value, sentNotification);
            _companyContext.SentNotifications.Add(sentNotification);
            _companyContext.SaveChanges();
            return _companyContext.SentNotifications.FirstOrDefault(s => s.sent_notification_name == value.sent_notification_name);
        }

        // PUT api/<SentNotificationController>/5
        [HttpPut]
        public SentNotification Put([FromBody] UpdateSentNotification value)
        {
            var notification = _companyContext.SentNotifications.FirstOrDefault(s => s.notification_sent_identifier == value.notification_sent_identifier);
            if (notification != null)
            {
                var notificationNew = new SentNotification();
                notificationNew.id = notification.id;
                notificationNew.created_by = notification.created_by;
                notificationNew.created_date = notification.created_date;
                notificationNew.modified_date = DateTime.UtcNow;
                notificationNew.modified_by = "Application";
                PropertyCopier<UpdateSentNotification, SentNotification>.Copy(value, notificationNew);
                _companyContext.Entry<SentNotification>(notification).CurrentValues.SetValues(notificationNew);
                _companyContext.SaveChanges();
                return _companyContext.SentNotifications.FirstOrDefault(s => s.notification_sent_identifier == value.notification_sent_identifier);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<SentNotificationController>/5
        [HttpDelete]
        public IEnumerable<SentNotification> Delete([FromBody] DeleteSentNotification value)
        {
            var notification = _companyContext.SentNotifications.FirstOrDefault(s => s.notification_sent_identifier == value.notification_sent_identifier);
            if (notification != null)
            {
                _companyContext.SentNotifications.Remove(notification);
                _companyContext.SaveChanges();
                return _companyContext.SentNotifications.Where(x => x.company_identifier == value.company_identifier);
            }
            else {
                return _companyContext.SentNotifications.Where(x => x.company_identifier == value.company_identifier);
            }
        }
    }
}
