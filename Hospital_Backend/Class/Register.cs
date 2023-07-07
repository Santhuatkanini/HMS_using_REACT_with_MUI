using System;
using System.ComponentModel.DataAnnotations;

namespace SanthuHospital.Class
{
    public class Register
    {
        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        public DateTime Dob { get; set; }

        public string Qualification { get; set; }

        public string MobileNumber { get; set; }

        public string Country { get; set; }

        public string State { get; set; }

        public string City { get; set; }

        public string Role { get; set; }

        public string Status { get; set; } = "Active"; 

        public string Salutation { get; set; }

        public string MagicWord { get; set; }
    }
}
