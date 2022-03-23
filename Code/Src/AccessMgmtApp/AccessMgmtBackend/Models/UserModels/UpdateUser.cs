namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class UpdateAppUser
    {
        public Guid user_identifier { get; set; }
        public string company_identifier { get; set; }
        public string user_name { get; set; }
        public string? user_description { get; set; }
        public IFormFile? user_description_attachment { get; set; }
        public bool is_active { get; set; }
        public bool? is_nda_required { get; set; }
        public bool? is_bc_required { get; set; }
        public bool? is_certification_required { get; set; }
        public string? associated_assets { get; set; }
    }
}
