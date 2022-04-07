﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    public class UpdateCompany
    {        
        public Guid company_identifier { get; set; }
        public string company_name { get; set; }
        public string company_email { get; set; }
        public string? company_email2 { get; set; }
        public string company_phone { get; set; }
        public string company_country { get; set; }
        public string company_city { get; set; }
        public string company_postal_code { get; set; }
        public string company_address { get; set; }
        public DateTime? company_activation_date { get; set; }
        public DateTime? company_deactivation_date { get; set; }
        public bool is_active { get; set; }
        public bool? is_approved { get; set; }
    }
}
