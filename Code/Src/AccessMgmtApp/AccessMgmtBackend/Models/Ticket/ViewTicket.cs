namespace AccessMgmtBackend.Models
{
    public class ViewTicket
    {
        public string company_identifier { get; set; }
        public string ticket_identifier { get; set; }
        public string? ticket_subject { get; set; }
        public string? ticket_content { get; set; }
        public string? ticket_html { get; set; }
        public string? ticket_status { get; set; }
        public string? ticket_user_guid { get; set; }
        public string? ticket_agent_guid { get; set; }   
        public DateTime? ticket_completed_at { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public List<TicketComment> TicketComments { get; set; }
    }
}
