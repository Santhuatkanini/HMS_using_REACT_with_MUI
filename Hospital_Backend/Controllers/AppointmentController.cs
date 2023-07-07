using Microsoft.AspNetCore.Mvc;
using SanthuHospital.Class;
using SanthuHospital.Data;
using System;
using System.Linq;

namespace SanthuSchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public AppointmentController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAppointments()
        {
            var appointments = _dbContext.Appointments.ToList();
            return Ok(appointments);
        }

        [HttpPost]
        public IActionResult CreateAppointment(Appointment model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid appointment data");
            }

            // Set the created date/time
            model.CreatedAt = DateTime.UtcNow;

            // Save the appointment to the database
            _dbContext.Appointments.Add(model);
            _dbContext.SaveChanges();

            return Ok("Appointment created successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAppointment(int id)
        {
            var appointment = _dbContext.Appointments.Find(id);
            if (appointment == null)
            {
                return NotFound("Appointment not found");
            }

            _dbContext.Appointments.Remove(appointment);
            _dbContext.SaveChanges();

            return Ok("Appointment deleted successfully");
        }

        [HttpPost("update-status/{appointmentId}")]
        public IActionResult UpdateAppointmentStatus(int appointmentId)
        {
            var appointment = _dbContext.Appointments
                .FirstOrDefault(a => a.Id == appointmentId && a.Status == "Appointment Pending");

            if (appointment == null)
            {
                return NotFound("Appointment not found");
            }

            // Update appointment status to "Appointment Fixed"
            appointment.Status = "Appointment Fixed";

            _dbContext.SaveChanges();

            // Fetch the details of appointments with status "Appointment Pending"
            var appointments = _dbContext.Appointments
                .Where(a => a.Status == "Appointment Pending")
                .ToList();

            return Ok(appointments);
        }

        [HttpPost("update-status2/{appointmentId}")]
        public IActionResult UpdateAppointmentStatus2(int appointmentId)
        {
            var appointment = _dbContext.Appointments
                .FirstOrDefault(a => a.Id == appointmentId && (a.Status == "Appointment Pending" || a.Status == "Appointment Fixed"));

            if (appointment == null)
            {
                return NotFound("Appointment not found");
            }

            // Update appointment status to "Appointment Cancelled"
            appointment.Status = "Appointment Cancelled";

            _dbContext.SaveChanges();

            // Fetch the details of appointments with status "Appointment Pending" or "Appointment Fixed" and are not canceled
            var appointments = _dbContext.Appointments
                .Where(a => (a.Status == "Appointment Pending" || a.Status == "Appointment Fixed") && a.Status != "Appointment Cancelled")
                .ToList();

            return Ok(appointments);

        }

    }
}
