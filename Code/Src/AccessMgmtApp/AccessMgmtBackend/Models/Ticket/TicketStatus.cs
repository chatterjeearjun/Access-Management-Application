namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("ac_ticket_status")]
    public class TicketStatus
    {        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Key]
        public Guid status_identifier { get; set; }
        public string company_identifier { get; set; }
        public string status_name { get; set; }
        public int status_value { get; set; }
    }
}
