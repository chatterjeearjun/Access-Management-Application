using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    [NotMapped]
    public class EmployeeDocument
    {
        public string DocumentId { get; set; }
        public string DocumentName { get; set; }
        public string DocumentPath { get; set; }
    }
    [NotMapped]
    public class CreateEmployeeDocument
    {
        public string DocumentId { get; set; }
        public string DocumentName { get; set; }
        public IFormFile? DocumentDetail { get; set; }
    }
}
