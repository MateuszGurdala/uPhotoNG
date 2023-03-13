using Microsoft.EntityFrameworkCore;
using uPhotoNG.Models.Entities;
using uPhotoNG.Models.Intersections;

namespace uPhotoNG.Database
{
    public class ApplicationDbContext : DbContext
    {
        //Entities
        private DbSet<User> Users { get; set; }
        private DbSet<Photo> Photos { get; set; }
        private DbSet<Album> Albums { get; set; }
        private DbSet<Place> Places { get; set; }
        private DbSet<Tag> Tags { get; set; }

        //Intersections
        private DbSet<UserAlbum> UserAlbums { get; set; }
        private DbSet<UserPlace> UserPlaces { get; set; }
        private DbSet<PhotoTag> PhotoTags { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User
            modelBuilder.Entity<User>(e => e.HasIndex(e => e.Id));
            modelBuilder.Entity<User>(e => e.HasIndex(e => e.Login).IsUnique());
            modelBuilder.Entity<User>(e => e.HasIndex(e => e.Email).IsUnique());

            //Photo
            modelBuilder.Entity<Photo>(e => e.HasIndex(e => e.Id));
            modelBuilder.Entity<Photo>(e => e.HasIndex(e => new { e.FileName, e.OwnerId }).IsUnique());

            //Album
            modelBuilder.Entity<Album>(e => e.HasIndex(e => e.Id));
            modelBuilder.Entity<Album>(e => e.HasIndex(e => new { e.Name, e.OwnerId }).IsUnique());

            //Place
            modelBuilder.Entity<Place>(e => e.HasIndex(e => e.Id).IsUnique());
            modelBuilder.Entity<Place>(e => e.HasIndex(e => new { e.Name, e.CreatedBy }).IsUnique());

            //Tag
            modelBuilder.Entity<Tag>(e => e.HasIndex(e => e.Value));

            //UserAlbum
            modelBuilder.Entity<UserAlbum>(e => e.HasKey(e => new { e.UserId, e.AlbumId }));
            modelBuilder.Entity<UserAlbum>(e => e.HasIndex(e => e.UserId));
            modelBuilder.Entity<UserAlbum>(e => e.HasIndex(e => e.AlbumId));

            //UserPlace
            modelBuilder.Entity<UserPlace>(e => e.HasKey(e => new { e.UserId, e.PlaceId }));
            modelBuilder.Entity<UserPlace>(e => e.HasIndex(e => e.UserId));
            modelBuilder.Entity<UserPlace>(e => e.HasIndex(e => e.PlaceId));

            //PhotoTag
            modelBuilder.Entity<PhotoTag>(e => e.HasKey(e => new { e.PhotoId, e.TagValue }));
            modelBuilder.Entity<PhotoTag>(e => e.HasIndex(e => e.PhotoId));
            modelBuilder.Entity<PhotoTag>(e => e.HasIndex(e => e.TagValue));

            base.OnModelCreating(modelBuilder);
        }
    }
}
