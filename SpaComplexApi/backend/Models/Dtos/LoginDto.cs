using System.ComponentModel.DataAnnotations;

namespace SpaComplexApi.Dtos
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Не указана почта")]
        [EmailAddress]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Минимальная длина 3")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "Не указан пароль")]
        [StringLength(500, MinimumLength = 4, ErrorMessage = "Минимальная длина 4")]
        public string Password { get; set; }
    }
}
