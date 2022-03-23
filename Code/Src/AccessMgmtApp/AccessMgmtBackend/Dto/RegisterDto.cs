using System.ComponentModel.DataAnnotations;

namespace AccessMgmtBackend.Dto
{
    public class RegisterDto
    {
        [Required]
        public string CompanyIdentifier { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 5)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 5)]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
        public string? user_description { get; set; }
        public IFormFile? user_description_attachment { get; set; }
        public bool is_active { get; set; }
        public bool? is_nda_required { get; set; }
        public bool? is_bc_required { get; set; }
        public bool? is_certification_required { get; set; }
        public string? associated_assets { get; set; }
        public string? user_role { get; set; }
        public string? user_group { get; set; }

    }
}
