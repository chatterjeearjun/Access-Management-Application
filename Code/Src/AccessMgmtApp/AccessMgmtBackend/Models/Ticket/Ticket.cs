namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("ac_tickets")]
    public class Ticket
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Key]
        public Guid ticket_identifier { get; set; }
        public string company_identifier { get; set; }
        public string? ticket_subject { get; set; }
        public string? ticket_content { get; set; }
        public string? ticket_html { get; set; }
        public int? ticket_status { get; set; }
        public string? ticket_user_guid { get; set; }
        public string? ticket_agent_guid { get; set; }   
        public DateTime? ticket_completed_at { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}
