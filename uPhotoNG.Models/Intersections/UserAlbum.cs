using System.ComponentModel.DataAnnotations.Schema;
using uPhotoNG.Models.Entities;

namespace uPhotoNG.Models.Intersections
{
    public class UserAlbum
    {
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public User? User { get; set; }

        [ForeignKey("Album")]
        public Guid AlbumId { get; set; }
        public Album? Album { get; set; }


        public UserAlbum(Guid userId, Guid albumId)
        {
            UserId = userId;
            AlbumId = albumId;
        }

        public UserAlbum(User user, Album album)
        {
            UserId = user.Id;
            AlbumId = album.Id;
        }
    }
}
