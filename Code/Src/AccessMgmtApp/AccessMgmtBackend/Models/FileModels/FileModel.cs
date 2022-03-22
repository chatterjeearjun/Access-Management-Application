namespace AccessMgmtBackend.Models
{
    public class FileModel
    {
        public IFormFile File { get; set; }
        public string company_identifier { get; set; }
        public string user_identifier { get; set; }
    }
}
