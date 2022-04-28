namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("ac_ticket_comments")]
    public class TicketComment
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Key]
        public Guid comment_identifier { get; set; }
        public string? ticket_identifier { get; set; }
        public string? comment_content { get; set; }
        public string? comment_html { get; set; }
        public string? comment_user_guid { get; set; }        
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}
