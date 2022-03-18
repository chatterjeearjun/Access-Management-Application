namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    public class CreateRole
    {
        public string company_identifier { get; set; }
        public string role_name { get; set; }
        public string? role_description { get; set; }
        public string? role_description_attachment { get; set; }
        public bool is_active { get; set; }
        public bool? is_nda_required { get; set; }
        public bool? is_bc_required { get; set; }
        public bool? is_certification_required { get; set; }
        public string? associated_assets { get; set; }
        public string? associated_groups { get; set; }
    }
}
