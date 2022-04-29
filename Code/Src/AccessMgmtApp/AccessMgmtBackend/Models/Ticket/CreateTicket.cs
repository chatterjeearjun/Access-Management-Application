namespace AccessMgmtBackend.Models
{
    public class CreateTicket
    {
        public string company_identifier { get; set; }
        public string ticket_subject { get; set; }
        public string ticket_content { get; set; }
        public string? ticket_html { get; set; }
        public string ticket_user_guid { get; set; }
        public string ticket_agent_guid { get; set; }   
    }
}
