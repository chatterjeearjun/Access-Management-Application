namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("ac_employees")]
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid employee_identifier { get; set; }
        public string company_identifier { get; set; }
        public string? emp_role { get; set; }
        public string emp_designation { get; set; }
        public string emp_first_name { get; set; }
        public string emp_last_name { get; set; }
        public string emp_email { get; set; }
        public string? emp_office_phone { get; set; }
        public string emp_mobile_number { get; set; }
        public DateTime? emp_dob { get; set; }
        public DateTime emp_joining_date { get; set; }
        public DateTime? emp_relieving_date { get; set; }
        public string? emp_nda_document1 { get; set; }
        public string? emp_nda_document2 { get; set; }
        public string? emp_nda_document3 { get; set; }
        public string? emp_nda_document4 { get; set; }
        public DateTime? emp_nda_review_date { get; set; }
        public string? emp_bc_document1 { get; set; }
        public string? emp_bc_document2 { get; set; }
        public string? emp_bc_document3 { get; set; }
        public string? emp_bc_document4 { get; set; }
        public DateTime? emp_bc_review_date { get; set; }
        public string? emp_cert_document1 { get; set; }
        public string? emp_cert_document2 { get; set; }
        public string? emp_cert_document3 { get; set; }
        public string? emp_cert_document4 { get; set; }
        public DateTime? emp_cert_review_date { get; set; }
        public bool is_active { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}
