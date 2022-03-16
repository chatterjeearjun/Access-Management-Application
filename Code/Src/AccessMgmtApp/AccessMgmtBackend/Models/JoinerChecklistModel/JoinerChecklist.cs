using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    [Table("ac_new_joiner_checklist")]
    public class JoinerChecklist
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Key]
        public Guid checklist_identifier { get; set; }
        public string company_identifier { get; set; }
        public string checklist_name { get; set; }
        public bool? resume { get; set; }
        public bool? photo { get; set; }
        public bool? nda { get; set; }
        public bool? prev_company_relieving_letter { get; set; }
        public bool? offer_letter_signed { get; set; }
        public bool? educational_certificates { get; set; }
        public bool? home_address { get; set; }
        public bool? nominee_details { get; set; }
        public bool? mobile_number { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}
