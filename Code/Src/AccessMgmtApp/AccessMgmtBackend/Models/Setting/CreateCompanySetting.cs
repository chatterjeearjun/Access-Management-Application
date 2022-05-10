using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    public class CreateCompanySetting
    {        
        public string company_identifier { get; set; }
        public string setting_key { get; set; }
        public string? setting_value { get; set; }        
        public bool is_active { get; set; }       
    }
}
