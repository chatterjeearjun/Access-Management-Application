using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    [Table("ac_company_settings")]
    public class CompanySetting
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Key]
        public Guid setting_identifier { get; set; }
        public string company_identifier { get; set; }
        public string setting_key { get; set; }
        public string? setting_value { get; set; }        
        public bool is_active { get; set; }       
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}
