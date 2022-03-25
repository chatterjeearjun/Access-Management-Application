﻿namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    [Table("ac_asset_user")]
    public class AssetToUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int id { get; set; }
        public string company_identifier { get; set; }
        public string asset_identifier { get; set; }
        public string user_identifier { get; set; }
        public bool is_active { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}