namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("ac_role")]
    public class Role
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Key]
        public Guid role_identifier { get; set; }
        public string company_identifier { get; set; }
        public string role_name { get; set; }
        public string? role_description { get; set; }
        public bool is_active { get; set; }
        public bool? is_approved { get; set; }
        public string? role_description_attachment { get; set; }
        public string? associated_documents { get; set; }
        public string? associated_assets { get; set; }
        public string? associated_groups { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}
