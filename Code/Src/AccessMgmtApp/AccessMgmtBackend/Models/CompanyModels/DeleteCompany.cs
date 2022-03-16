using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    public class DeleteCompany
    {
        public Guid company_identifier { get; set; }
    }
}
