using System.ComponentModel.DataAnnotations;

namespace SpaComplexApi.Models
{
    public class User
    {
        [Required]
        public int User_Id { get; set; }

        [Required(ErrorMessage = "Не указано имя пользователя")]
        [RegularExpression(@"^[a-zA-Zа-яА-ЯёЁ]+")]
        [StringLength(100,MinimumLength = 3, ErrorMessage = "Минимальная длина 3")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Не указано фамилия пользователя")]
        [RegularExpression(@"^[a-zA-Zа-яА-ЯёЁ]+")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Минимальная длина 3")]
        public string LastName { get; set; }

        [RegularExpression(
             @"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
             ErrorMessage = "Email должен выглядить так xxx@xx.xx")]
        [Required(ErrorMessage = "Не указана почта")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Минимальная длина 3")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "Не указан пароль")]
        [StringLength(500, MinimumLength = 4, ErrorMessage = "Минимальная длина 4")]
        public string Password { get; set; }
        public string Role { get; set; }


    }
}
