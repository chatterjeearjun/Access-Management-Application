using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private CompanyContext _companyContext;
        private IConfiguration configuration;
        public TicketController(CompanyContext companyContext, IConfiguration iConfig)
        {
            _companyContext = companyContext;
            configuration = iConfig;
        }

        // GET: api/<TicketController>/GetByCompany/{companyId}
        [HttpGet]
        public List<ViewTicket> GetByCompany(string companyId)
        {
            List<ViewTicket> vt = new List<ViewTicket>();
            var ListTickets = _companyContext.Tickets.Where(x => x.company_identifier == companyId).ToList();
            var LIstStatus = _companyContext.TicketStatus.Where(x => x.company_identifier == companyId).ToList();

            foreach (var ticket in ListTickets)
            {
                vt.Add(new ViewTicket {
                    ticket_identifier = ticket.ticket_identifier.ToString(),
                    company_identifier = ticket.company_identifier,
                    ticket_subject = ticket.ticket_subject,
                    ticket_content = ticket.ticket_content,
                    ticket_html = ticket.ticket_html,
                    ticket_status = LIstStatus.Where(x=>x.status_value==ticket.ticket_status).FirstOrDefault().status_name,
                    ticket_user_guid = ticket.ticket_user_guid,
                    ticket_agent_guid = ticket.ticket_agent_guid,
                    ticket_completed_at = ticket.ticket_completed_at,
                    created_date = ticket.created_date,
                    created_by = ticket.created_by,
                    TicketComments = _companyContext.TicketComments.Where(x => x.ticket_identifier == ticket.ticket_identifier.ToString()).ToList()

                }
                );
            }
            return vt;
        }

        // GET api/<TicketController>/{guid}
        [HttpGet("{guid}")]
        public ViewTicket Get(string guid)
        {
            ViewTicket vt = new ViewTicket();
            var ticket = _companyContext.Tickets.FirstOrDefault(x => x.ticket_identifier == new Guid(guid));
            var ListStatus = _companyContext.TicketStatus.ToList();
            PropertyCopier<Ticket, ViewTicket>.Copy(ticket, vt);
            vt.ticket_identifier = ticket.ticket_identifier.ToString();
            vt.ticket_status = ListStatus.Where(x => x.status_value == ticket.ticket_status).FirstOrDefault().status_name;
            vt.TicketComments = _companyContext.TicketComments.Where(x => x.ticket_identifier == ticket.ticket_identifier.ToString()).ToList();
            return vt;
        }

        // POST api/<TicketController>
        [HttpPost]
        [AllowAnonymous]
        public async Task<ViewTicket> Post([FromBody] CreateTicket value)
        {
            var viewticket = new ViewTicket();
            var ticket = new Ticket();
            ticket.created_date = DateTime.UtcNow;
            ticket.created_by = "Application";

            PropertyCopier<CreateTicket, Ticket>.Copy(value, ticket);
            ticket.ticket_status = 1;
            _companyContext.Tickets.Add(ticket);
            _companyContext.SaveChanges();

            var newTicket = _companyContext.Tickets.FirstOrDefault(s => s.ticket_identifier == ticket.ticket_identifier);
            PropertyCopier<Ticket, ViewTicket>.Copy(newTicket, viewticket);
            viewticket.ticket_identifier = newTicket.ticket_identifier.ToString();

            return viewticket;
        }

        // PUT api/<TicketController>/5
        [HttpPut]
        public ViewTicket Put([FromBody] UpdateTicket value)
        {
            var viewticket = new ViewTicket();
            var ticket = _companyContext.Tickets.FirstOrDefault(s => s.ticket_identifier.ToString() == value.ticket_identifier);
            var ListStatus = _companyContext.TicketStatus.ToList();
            if (ticket != null)
            {
                CreateBackup(ticket, "Update");
                var ticketNew = new Ticket();
                ticketNew.id = ticket.id;
                ticketNew.created_by = ticket.created_by;
                ticketNew.created_date = ticket.created_date;
                ticketNew.modified_date = DateTime.UtcNow;
                ticketNew.modified_by = "Application";
                PropertyCopier<UpdateTicket, Ticket>.Copy(value, ticketNew);
                ticketNew.ticket_identifier = ticket.ticket_identifier;
                ticketNew.company_identifier = ticket.company_identifier;
                _companyContext.Entry<Ticket>(ticket).CurrentValues.SetValues(ticketNew);
                if (!string.IsNullOrEmpty(value.comment_content))
                {
                    _companyContext.TicketComments.Add(new TicketComment
                    {
                        id = 0,
                        ticket_identifier = value.ticket_identifier,
                        comment_content = value.comment_content,
                        comment_html = value.comment_html,
                        comment_user_guid = value.comment_user_guid,
                        created_date = DateTime.UtcNow,
                        created_by = "Application"
                });
                }
                _companyContext.SaveChanges();

                var updatedticket = _companyContext.Tickets.FirstOrDefault(x => x.ticket_identifier == new Guid(value.ticket_identifier));
                PropertyCopier<Ticket, ViewTicket>.Copy(updatedticket, viewticket);
                viewticket.ticket_identifier = updatedticket.ticket_identifier.ToString();
                viewticket.ticket_status = ListStatus.Where(x => x.status_value == updatedticket.ticket_status).FirstOrDefault().status_name;
                viewticket.TicketComments = _companyContext.TicketComments.Where(x => x.ticket_identifier == updatedticket.ticket_identifier.ToString()).ToList();
                return viewticket;
            }
            else
            {
                return null;
            }
        }
        private void CreateBackup(Ticket company, string reason)
        {
            TicketHistory history = new TicketHistory();
            PropertyCopier<Ticket, TicketHistory>.Copy(company, history);
            history.id = 0;
            history.reason = reason;
            history.ticket_identifier = company.ticket_identifier.ToString();
            _companyContext.TicketHistory.Add(history);
            _companyContext.SaveChanges();
        }
    }
}
