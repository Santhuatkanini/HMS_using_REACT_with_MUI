using System;

namespace SanthuHospital.Models
{
    public class DoctorUpdateModel
    {
        public string Salutation { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime Dob { get; set; }
        public string Qualification { get; set; }
        public string MobileNumber { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }

        public string Status { get; set; }
    }
}