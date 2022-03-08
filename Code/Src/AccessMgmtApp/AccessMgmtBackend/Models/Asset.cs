﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    [Table("ac_assets")]
    public class Asset
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public int company_id { get; set; }
        public int asset_id { get; set; }
        public string asset_name { get; set; }
        public string? asset_owner { get; set; }
        public string? asset_location { get; set; }
        public string? asset_risk_ranking { get; set; }
        public string? asset_type { get; set; }
        public string? asset_description { get; set; }
        public string? asset_description_attachment { get; set; }
        public bool? is_active { get; set; }
        public bool? is_mda_required { get; set; }
        public bool? is_bc_required { get; set; }
        public bool? certification_required { get; set; }
        public DateTime? alocation_start_date { get; set; }
        public DateTime? alocation_end_date { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}
