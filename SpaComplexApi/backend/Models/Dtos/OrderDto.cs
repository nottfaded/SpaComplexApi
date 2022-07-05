using System;
using System.ComponentModel.DataAnnotations;

namespace SpaComplexApi.Dtos
{
    public class OrderDto
    {
        public int User_Id { get; set; }
        
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        [StringLength(10, ErrorMessage = "номер телефона состоит из 10 цифр")]
        public string Phone { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

        public string Comment { get; set; }
        public int Receipt_Id { get; set; }
        public int Subscription_Id { get; set; }
        public int Count { get; set; }

    }
}
