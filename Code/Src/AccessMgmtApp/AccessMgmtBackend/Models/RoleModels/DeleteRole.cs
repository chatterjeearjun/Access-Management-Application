namespace AccessMgmtBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class DeleteRole
    {
        public Guid role_identifier { get; set; }
        public string company_identifier { get; set; }       
    }
}
