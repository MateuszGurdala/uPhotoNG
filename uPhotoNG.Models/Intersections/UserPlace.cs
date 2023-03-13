using System.ComponentModel.DataAnnotations.Schema;
using uPhotoNG.Models.Entities;

namespace uPhotoNG.Models.Intersections
{
    public class UserPlace
    {
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public User? User { get; set; }

        [ForeignKey("Place")]
        public Guid PlaceId { get; set; }
        public Place? Place { get; set; }


        public UserPlace(Guid userId, Guid placeId)
        {
            UserId = userId;
            PlaceId = placeId;
        }

        public UserPlace(User user, Place place)
        {
            UserId = user.Id;
            PlaceId = place.Id;
        }
    }
}
