using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    public class DeleteNotificationType
    {        
        public Guid notification_identifier { get; set; }
        public string company_identifier { get; set; }
    }
}
