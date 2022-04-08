using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    [Table("ac_companies")]
    public class Company
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Key]
        public Guid company_identifier { get; set; }
        public string company_name { get; set; }
        public string company_email { get; set; }
        public string? company_email2 { get; set; }
        public string company_phone { get; set; }
        public string company_country { get; set; }
        public string company_city { get; set; }
        public string company_postal_code { get; set; }
        public string company_address { get; set; }
        public DateTime? company_activation_date { get; set; }
        public DateTime? company_deactivation_date { get; set; }
        public bool is_active { get; set; }
        public bool? is_approved { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}
