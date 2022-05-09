﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    [Table("ac_users_history")]
    public class AppUserHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }        
        public string user_identifier { get; set; }
        public string company_identifier { get; set; }
        public string user_name { get; set; }
        public string? user_description { get; set; }
        public string? user_description_attachment { get; set; }
        public bool is_active { get; set; }
        public bool? is_approved { get; set; }
        public bool? is_nda_required { get; set; }
        public bool? is_bc_required { get; set; }
        public bool? is_certification_required { get; set; }
        public string? associated_assets { get; set; }
        public string? user_role { get; set; }
        public string? user_group { get; set; }
        public string? user_profile_picture { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
        public string? reason { get; set; }
    }
}