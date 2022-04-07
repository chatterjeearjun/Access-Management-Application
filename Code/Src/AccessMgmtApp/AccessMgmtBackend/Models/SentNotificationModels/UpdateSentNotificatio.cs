using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    public class UpdateSentNotification
    {        
        public Guid notification_sent_identifier { get; set; }
        public string company_identifier { get; set; }
        public string sent_notification_name { get; set; }
        public int? notification_type_id { get; set; }
        public DateTime? sent_date { get; set; }
        public string notification_sent_to { get; set; }
        public bool is_active { get; set; }
        public bool? is_approved { get; set; }
    }
}
