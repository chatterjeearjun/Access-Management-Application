namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    public class CreateEmployee
    {        
        public string company_identifier { get; set; }
        public string? emp_role { get; set; }
        public string? emp_group { get; set; }
        public string emp_designation { get; set; }
        public string emp_first_name { get; set; }
        public string emp_last_name { get; set; }
        public string emp_email { get; set; }
        public string? emp_office_phone { get; set; }
        public string emp_mobile_number { get; set; }
        public DateTime? emp_dob { get; set; }
        public DateTime emp_joining_date { get; set; }
        public DateTime? emp_relieving_date { get; set; }
        public IFormFile? emp_nda_document1 { get; set; }
        public IFormFile? emp_nda_document2 { get; set; }
        public DateTime? emp_nda_review_date { get; set; }
        public IFormFile? emp_bc_document1 { get; set; }
        public IFormFile? emp_bc_document2 { get; set; }
        public DateTime? emp_bc_review_date { get; set; }
        public IFormFile? emp_cert_document1 { get; set; }
        public IFormFile? emp_cert_document2 { get; set; }
        public DateTime? emp_cert_review_date { get; set; }
        public IFormFile? emp_profile_picture { get; set; }
        public bool is_active { get; set; }
        public bool? is_approved { get; set; }
        public string? associated_assets { get; set; }
        public DateTime? emp_approval_overdue { get; set; }
    }
}
