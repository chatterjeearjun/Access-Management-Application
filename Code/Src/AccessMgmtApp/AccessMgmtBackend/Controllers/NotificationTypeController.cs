using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
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
        [HttpGet]
        public IEnumerable<NotificationType> GetByCompany(string companyId)
        {
            return _companyContext.NotificationTypes.Where(s => s.company_identifier == companyId).ToList();
        }

        // POST api/<NotificationTypeController>
        [HttpPost]
        public NotificationType Post([FromBody] CreateNotificationType value)
        {
            var notification = new NotificationType();
            notification.created_date = DateTime.UtcNow;
            notification.created_by = "Application";
            notification.is_active = true;
            PropertyCopier<CreateNotificationType, NotificationType>.Copy(value, notification);
            _companyContext.NotificationTypes.Add(notification);
            _companyContext.SaveChanges();
            return _companyContext.NotificationTypes.FirstOrDefault(s => s.notification_name == value.notification_name);
        }

        // PUT api/<NotificationTypeController>/5
        [HttpPut]
        public NotificationType Put([FromBody] UpdateNotificationType value)
        {
            var notification = _companyContext.NotificationTypes.FirstOrDefault(s => s.notification_identifier == value.notification_identifier);
            if (notification != null)
            {
                var notificationNew = new NotificationType();
                notificationNew.id = notification.id;
                notificationNew.created_by = notification.created_by;
                notificationNew.created_date = notification.created_date;
                notificationNew.modified_date = DateTime.UtcNow;
                notificationNew.modified_by = "Application";
                PropertyCopier<UpdateNotificationType, NotificationType>.Copy(value, notificationNew);
                _companyContext.Entry<NotificationType>(notification).CurrentValues.SetValues(notificationNew);
                _companyContext.SaveChanges();
                return _companyContext.NotificationTypes.FirstOrDefault(s => s.notification_identifier == value.notification_identifier);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<NotificationTypeController>/5
        [HttpDelete]
        public IEnumerable<NotificationType> Delete([FromBody] DeleteNotificationType value)
        {
            var notification = _companyContext.NotificationTypes.FirstOrDefault(s => s.notification_identifier == value.notification_identifier);
            if (notification != null)
            {
                _companyContext.NotificationTypes.Remove(notification);
                _companyContext.SaveChanges();
                return _companyContext.NotificationTypes.Where(x => x.company_identifier == value.company_identifier);
            }
            else
            {
                return _companyContext.NotificationTypes.Where(x => x.company_identifier == value.company_identifier);
            }
        }
    }
}
