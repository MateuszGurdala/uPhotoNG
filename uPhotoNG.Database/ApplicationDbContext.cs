using Microsoft.EntityFrameworkCore;
using uPhotoNG.Models;

namespace uPhotoNG.Database
{
    public class ApplicationDbContext : DbContext
    {
        private DbSet<User> Users { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(e => e.HasIndex(e => e.Login).IsUnique());
            modelBuilder.Entity<User>(e => e.HasIndex(e => e.Email).IsUnique());
            base.OnModelCreating(modelBuilder);
        }
    }
}
