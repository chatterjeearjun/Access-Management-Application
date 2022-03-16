using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    public class DeleteJoinerChecklist
    {
        public Guid checklist_identifier { get; set; }
        public string company_identifier { get; set; }        
    }
}
