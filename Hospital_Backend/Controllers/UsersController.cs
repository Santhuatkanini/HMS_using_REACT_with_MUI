using Microsoft.AspNetCore.Mvc;
using SanthuHospital.Data;
using SanthuHospital.Class;
using System;
using System.Linq;
using SanthuHospital.Models;

namespace SanthuHospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public UsersController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // PUT: api/User/doctor/{id}
        [HttpPut("doctor/{id}")]
        public IActionResult UpdateDoctor(int id, [FromBody] DoctorUpdateModel model)
        {
            var doctor = _dbContext.Register.FirstOrDefault(d => d.Id == id);

            if (doctor == null)
            {
                return NotFound();
            }

            // Update the doctor details
            doctor.Salutation = model.Salutation;
            doctor.FirstName = model.FirstName;
            doctor.LastName = model.LastName;
            doctor.Email = model.Email;
            doctor.Dob = model.Dob;
            doctor.Qualification = model.Qualification;
            doctor.MobileNumber = model.MobileNumber;
            doctor.Country = model.Country;
            doctor.State = model.State;
            doctor.City = model.City;

            _dbContext.SaveChanges();

            return Ok(doctor);
        }

        // PUT: api/User/patient/{id}
        [HttpPut("patient/{id}")]
        public IActionResult UpdatePatient(int id, [FromBody] PatientUpdateModel model)
        {
            var patient = _dbContext.Register.FirstOrDefault(p => p.Id == id);

            if (patient == null)
            {
                return NotFound();
            }

            // Update the patient details
            patient.Salutation = model.Salutation;
            patient.FirstName = model.FirstName;
            patient.LastName = model.LastName;
            patient.Email = model.Email;
            patient.Dob = model.Dob;
            patient.MobileNumber = model.MobileNumber;
            patient.Country = model.Country;
            patient.State = model.State;
            patient.City = model.City;

            _dbContext.SaveChanges();

            return Ok(patient);
        }
    }
}
