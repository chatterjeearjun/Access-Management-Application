using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    public class DeleteSentNotification
    {
        public Guid notification_sent_identifier { get; set; }
        public string company_identifier { get; set; }        
    }
}
