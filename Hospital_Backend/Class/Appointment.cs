namespace SanthuHospital.Class
{
    public class Appointment
    {
        public int Id { get; set; }
        public string PatientName { get; set; }
        public string Reason { get; set; }
        public string TimeSlot { get; set; }
        public DateTime CreatedAt { get; set; }
        public int DoctorId { get; set; }
        public string Status { get; set; } = "Appointment Pending";
    }
}
