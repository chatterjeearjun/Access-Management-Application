using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    [Table("ac_notification_types")]
    public class NotificationType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        public string notification_name { get; set; }

        public string notification_subject { get; set; }

        public string notification_body { get; set; }

        public bool? is_active { get; set; }

        public bool? is_manual { get; set; }

        public DateTime? created_date { get; set; }

        public string created_by { get; set; }

        public DateTime? modified_date { get; set; }

        public string modified_by { get; set; }
    }
}
