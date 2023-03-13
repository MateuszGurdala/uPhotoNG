using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using uPhotoNG.Models.Entities;

namespace uPhotoNG.Models.Entities
{
    public class Place
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public bool IsPublic { get; set; }

        [Required]
        public bool IsSystemPlace { get; set; }

        [Required]
        [ForeignKey("User")]
        public Guid? CreatedBy { get; set; }
        public User? User { get; set; }

        public float? Latitude { get; set; }
        public float? Longitude { get; set; }
        public string? Description { get; set; }

        public Place(string name, bool isPublic, string? description)
        {
            Id = Guid.NewGuid();

            Name = name;
            IsPublic = isPublic;
        }

        public void SetCreator(User user)
        {
            CreatedBy = user.Id;
        }

        private void SetAsSystemPlace()
        {
            IsSystemPlace = true;
        }

        public void SetCoordinates(float latitude, float longitude)
        {
            Latitude = latitude;
            Longitude = longitude;
        }

        public static Place CreateDefaultPlace(User user)
        {
            var defaultPlace = new Place("NoPlace", false, null);
            defaultPlace.SetCreator(user);
            defaultPlace.SetAsSystemPlace();

            return defaultPlace;
        }
    }
}
