namespace AccessMgmtBackend.Models
{
    public class EmployeePhotoUpload
    {
        public string company_identifier { get; set; }
        public string employee_identifier { get; set; }
        public IFormFile? emp_profile_picture { get; set; }
    }
}
