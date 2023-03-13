using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace uPhotoNG.Models.Entities
{
    public class Album
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

        public void SetAsSystemAlbum()
        {
            IsSystemAlbum = true;
        }

        public void SetAsShared()
        {
            IsShared = true;
        }
    }
}
