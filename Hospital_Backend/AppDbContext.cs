using Microsoft.EntityFrameworkCore;
using SanthuHospital.Class;

namespace SanthuHospital.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Register> Register { get; set; }
        public DbSet<Appointment> Appointments { get; set; } // Add this line

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}
