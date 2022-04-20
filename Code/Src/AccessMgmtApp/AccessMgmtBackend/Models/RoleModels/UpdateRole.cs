namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    public class UpdateRole
    {
        public string role_identifier { get; set; }
        public string company_identifier { get; set; }
        public string role_name { get; set; }
        public string? role_description { get; set; }
        public bool is_active { get; set; }
        public bool? is_approved { get; set; }
        public IFormFile? role_description_attachment { get; set; }
        public string? role_document_mapping { get; set; }
        public string? associated_assets { get; set; }
        public string? associated_groups { get; set; }
    }
}
