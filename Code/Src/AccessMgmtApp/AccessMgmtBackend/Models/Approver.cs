using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    [Table("ac_approvers")]
    public class Approver
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        public string approver_name { get; set; }

        public string approver_email { get; set; }

        public string approver_role { get; set; }

        public DateTime? created_date { get; set; }

        public string? created_by { get; set; }

        public DateTime? modified_date { get; set; }

        public string? modified_by { get; set; }
    }
}
