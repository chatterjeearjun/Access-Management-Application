using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    [Table("ac_approvers_history")]
    public class ApproverHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }       
        public string approver_identifier { get; set; }
        public string company_identifier { get; set; }
        public string approver_first_name { get; set; }
        public string approver_last_name { get; set; }
        public string approver_email { get; set; }
        public string? approver_office_phone { get; set; }
        public string approver_mobile_number { get; set; }
        public string approver_role { get; set; }
        public bool is_active { get; set; }
        public bool? is_approved { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
        public string? reason { get; set; }
    }
}
