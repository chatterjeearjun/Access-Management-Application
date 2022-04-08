using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    [Table("ac_notifications_sent")]
    public class SentNotification
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Key]
        public Guid notification_sent_identifier { get; set; }
        public string company_identifier { get; set; }
        public string sent_notification_name { get; set; }
        public int? notification_type_id { get; set; }
        public DateTime? sent_date { get; set; }
        public string notification_sent_to { get; set; }
        public bool is_active { get; set; }
        public bool? is_approved { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}
