namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("ac_group")]
    public class Group
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Key]
        public Guid group_identifier { get; set; }
        public string company_identifier { get; set; }
        public string group_name { get; set; }
        public string? group_description { get; set; }
        public string? group_description_attachment { get; set; }
        public bool is_active { get; set; }
        public bool? is_nda_required { get; set; }
        public bool? is_bc_required { get; set; }
        public bool? is_certification_required { get; set; }
        public DateTime? group_start_date { get; set; }
        public DateTime? group_end_date { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}
