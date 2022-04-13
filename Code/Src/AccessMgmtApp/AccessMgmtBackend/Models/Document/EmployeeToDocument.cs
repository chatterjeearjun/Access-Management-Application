using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    [Table("ac_employee_document")]
    public class EmployeeToDocument
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int id { get; set; }
        public string company_identifier { get; set; }
        public string employee_identifier { get; set; }
        public string document_identifier { get; set; }
        public string document_name { get; set; }
        public string file_identifier { get; set; }
        public bool is_active { get; set; }
        public bool? is_approved { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}
