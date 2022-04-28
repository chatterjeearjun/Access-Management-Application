namespace AccessMgmtBackend.Models
{
    public class UpdateTicket
    {
        public string ticket_identifier { get; set; }
        public string? ticket_subject { get; set; }
        public string? ticket_content { get; set; }
        public string? ticket_html { get; set; }
        public int? ticket_status { get; set; }
        public string? ticket_user_guid { get; set; }
        public string? ticket_agent_guid { get; set; }
        public string? comment_content { get; set; }
        public string? comment_html { get; set; }
        public string? comment_user_guid { get; set; }
    }
}
