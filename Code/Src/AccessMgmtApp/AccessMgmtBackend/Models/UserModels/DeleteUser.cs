namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class DeleteAppUser
    {
        public Guid user_identifier { get; set; }
        public string company_identifier { get; set; }        
    }
}
