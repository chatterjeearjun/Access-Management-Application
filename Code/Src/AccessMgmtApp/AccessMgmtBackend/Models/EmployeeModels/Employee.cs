namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("ac_employees")]
    public class Employee
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Key]
        public Guid employee_identifier { get; set; }
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
        public List<EmployeeDocument> emp_documents { get; set; }
        public string? associated_assets { get; set; }
        public string? emp_profile_picture { get; set; }
        public DateTime? emp_approval_overdue { get; set; }
        public bool is_active { get; set; }
        public bool? is_approved { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}
