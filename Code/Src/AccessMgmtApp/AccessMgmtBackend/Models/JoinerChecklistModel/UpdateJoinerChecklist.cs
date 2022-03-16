using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    public class UpdateJoinerChecklist
    {
        public Guid checklist_identifier { get; set; }
        public string company_identifier { get; set; }
        public string checklist_name { get; set; }
        public bool? resume { get; set; }
        public bool? photo { get; set; }
        public bool? nda { get; set; }
        public bool? prev_company_relieving_letter { get; set; }
        public bool? offer_letter_signed { get; set; }
        public bool? educational_certificates { get; set; }
        public bool? home_address { get; set; }
        public bool? nominee_details { get; set; }
        public bool? mobile_number { get; set; }
    }
}
