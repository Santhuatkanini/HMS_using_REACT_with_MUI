
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SanthuHospital.Class;
using SanthuHospital.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;
using System.Security.Cryptography;

namespace SanthuSchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public AuthController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] Register model)
        {
            // Perform validation on the registration form fields
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid registration data");
            }

            // Check if a user with the same email, mobile number, or ID already exists
            var existingUser = _dbContext.Register.FirstOrDefault(u =>
                u.Email == model.Email ||
                u.MobileNumber == model.MobileNumber ||
                u.Id == model.Id
            );

            if (existingUser != null)
            {
                return BadRequest("Account already exists");
            }

            // Save the registration data to the database
            _dbContext.Register.Add(model);
            _dbContext.SaveChanges();

            // Return appropriate response (e.g., success or error message)
            return Ok("Registration successful");
        }



        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            // Retrieve all users from the database
            var users = _dbContext.Register.ToList();

            // Return the users as a response
            return Ok(users);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(Login model)
        {
            var user = await _dbContext.Register.FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == model.Password);
            if (user == null)
            {
                return BadRequest("Invalid email or password");
            }

            if (user.Status == "Inactive")
            {
                return BadRequest("Your account is deactivated");
            }

            // Generate JWT token
            var token = GenerateJwtToken(user.Id);

            // Return the token as a response
            return Ok(new { token });
        }


        private string GenerateJwtToken(int userId)
        {
            // Create claims for the user
            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
        // Add additional claims as needed, such as user role
        new Claim(ClaimTypes.Role, GetUserRole(userId))
    };

            // Generate a secure key
            var keySizeInBytes = 32; // 128 bits
            var key = new byte[keySizeInBytes];

            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(key);
            }

            var signingKey = new SymmetricSecurityKey(key);

            // Generate the JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(2), // Set token expiration time
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Return the JWT token as a string
            return tokenHandler.WriteToken(token);
        }

        private string GetUserRole(int userId)
        {
            // Retrieve the user from the database
            var user = _dbContext.Register.FirstOrDefault(u => u.Id == userId);
            if (user != null)
            {
                // Return the user role
                return user.Role;
            }

            return string.Empty;
        }


        [HttpPost("disable/{userId}")]
        public IActionResult DisableUser(int userId)
        {
            var user = _dbContext.Register.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Update user status to "Inactive"
            user.Status = "Inactive";
            _dbContext.SaveChanges();

            return Ok("User disabled successfully");
        }

        [HttpPost("enable/{userId}")]
        public IActionResult EnableUser(int userId)
        {
            var user = _dbContext.Register.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Update user status to "Inactive"
            user.Status = "Active";
            _dbContext.SaveChanges();

            return Ok("User Enabled successfully");
        }


        [HttpDelete("users/{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            var user = _dbContext.Register.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Remove the user from the database
            _dbContext.Register.Remove(user);
            _dbContext.SaveChanges();

            return Ok("User deleted successfully");
        }

    }
}
