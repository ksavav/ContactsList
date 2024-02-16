using System.ComponentModel.DataAnnotations;

namespace api.DTO
{
    public class RegisterDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(20, MinimumLength = 8)]
        public string Password { get; set; }
        [Required]
        public string Role { get; set; }
        [Required]
        public string SpecificRole { get; set; } // tu pewnie powinien być enu
        [Required]
        public int Phone { get; set; }
        [Required]
        public DateOnly Birthday { get; set; }
    }
}