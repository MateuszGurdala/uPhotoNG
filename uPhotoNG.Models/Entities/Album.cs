using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using uPhotoNG.Models.Interfaces;

namespace uPhotoNG.Models.Entities
{
    public class Album: IDatabaseOption
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(50")]
        public string Name { get; set; }

        [Required]
        [ForeignKey("User")]
        public Guid? OwnerId { get; set; }
        public User? User { get; set; }


        [Required]
        public int PhotoCount { get; set; }

        [Required]
        public bool IsShared { get; set; }

        [Required]
        public bool IsSystemAlbum { get; set; }

        public string? Description { get; set; }


        public Album(string name, string? description)
        {
            Id = Guid.NewGuid();
            PhotoCount = 0;
            IsSystemAlbum = false;
            IsShared = false;

            Name = name;
            Description = description;
        }


        public static Album CreateDefaultAlbum(User owner)
        {
            var defaultAlbum = new Album("OtherPhotos", null);
            defaultAlbum.SetOwner(owner);
            defaultAlbum.SetAsSystemAlbum();

            return defaultAlbum;
        }
        public static Album CreateDeletedPhotosAlbum(User owner)
        {
            var deletedPhotosAlbum = new Album("DeletedPhotos", "Contains all deleted photos and photos transfered from deleted albums.");
            deletedPhotosAlbum.SetOwner(owner);
            deletedPhotosAlbum.SetAsSystemAlbum();

            return deletedPhotosAlbum;
        }
        private void SetAsSystemAlbum()
        {
            IsSystemAlbum = true;
        }
        public void SetOwner(User owner)
        {
            OwnerId = owner.Id;
        }
        public void SetAsShared()
        {
            IsShared = true;
        }
        public void IncrementPhotoCount()
        {
            PhotoCount++;
        }
    }
}
