using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models.ApproverModels
{
    public class CreateApprover
    {
        public string company_identifier { get; set; }
        public string approver_first_name { get; set; }
        public string approver_last_name { get; set; }
        public string approver_email { get; set; }
        public string? approver_office_phone { get; set; }
        public string approver_mobile_number { get; set; }
        public string approver_role { get; set; }
    }
}
