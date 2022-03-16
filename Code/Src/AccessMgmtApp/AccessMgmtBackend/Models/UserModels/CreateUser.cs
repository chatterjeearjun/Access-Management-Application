namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class CreateAppUser
    {   
        public string company_identifier { get; set; }
        public string user_name { get; set; }
        public string? user_description { get; set; }
        public string? user_description_attachment { get; set; }
        public bool is_active { get; set; }
        public bool? is_mda_required { get; set; }
        public bool? is_bc_required { get; set; }
        public bool? is_certification_required { get; set; }    
    }
}
