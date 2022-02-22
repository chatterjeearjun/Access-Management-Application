using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    [Table("ac_notifications_sent")]
    public class SentNotification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        public int? company_id { get; set; }

        public int? notification_type_id { get; set; }

        public DateTime? sent_date { get; set; }

        public string notification_sent_to { get; set; }

        public DateTime? created_date { get; set; }

        public string created_by { get; set; }

        public DateTime? modified_date { get; set; }

        public string modified_by { get; set; }
    }
}
