using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessMgmtBackend.Models
{
    [Table("ac_uploaded_file")]
    public class UploadedFile
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid file_identifier { get; set; }
        public string company_identifier { get; set; }
        public string? user_identifier { get; set; }
        public string upload_category { get; set; }
        public string friendly_file_name { get; set; }
        public string blob_file_name { get; set; }
        public bool is_active { get; set; }
        public DateTime? created_date { get; set; }
        public string? created_by { get; set; }
        public DateTime? modified_date { get; set; }
        public string? modified_by { get; set; }
    }
}
