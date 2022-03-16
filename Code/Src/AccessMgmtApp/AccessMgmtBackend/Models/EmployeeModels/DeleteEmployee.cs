namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class DeleteEmployee
    {
        public Guid employee_identifier { get; set; }
        public string company_identifier { get; set; }        
    }
}
