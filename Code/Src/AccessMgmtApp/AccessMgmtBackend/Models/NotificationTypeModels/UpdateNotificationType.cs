using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    public class UpdateNotificationType
    {        
        public Guid notification_identifier { get; set; }
        public string company_identifier { get; set; }
        public string notification_name { get; set; }
        public string notification_subject { get; set; }
        public string notification_body { get; set; }
        public bool? is_active { get; set; }
        public bool? is_manual { get; set; }
    }
}
