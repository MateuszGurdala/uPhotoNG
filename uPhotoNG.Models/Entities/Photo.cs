using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using uPhotoNG.Models.Structs;

namespace uPhotoNG.Models.Entities
{
    public class Photo
    {
        [Key]
        [Column(TypeName = "char(36)")]
        public Guid Id { get; set; }

        #region ForeignKeys
        [Required]
        [ForeignKey("User")]
        public Guid OwnerId { get; set; }
        public User? User { get; set; }

        [ForeignKey("Album")]
        public Guid? AlbumId { get; set; }
        public Album? Album { get; set; }

        [ForeignKey("Place")]
        public Guid? PlaceId { get; set; }
        public Place? Place { get; set; }
        #endregion
        #region Required
        [Required]
        public string FileName { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public bool IsFavorite { get; set; }

        [Required]
        [Column(TypeName = "varchar(10)")]
        public string MimeType { get; set; }

        [Required]
        public long Size { get; set; }

        [Required]
        public byte[] Data { get; set; }

        [Required]
        public DateTime DateTaken { get; set; }

        [Required]
        public DateTime DateUploaded { get; set; }
        #endregion

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public Photo() { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        public Photo(string title, bool isFavorite, string fileName, string mimeType, byte[] data, int size, DateTime dateTaken)
        {
            Id = Guid.NewGuid();
            DateUploaded = DateTime.UtcNow;

            FileName = fileName;
            Title = title;
            IsFavorite = isFavorite;
            MimeType = mimeType;
            Size = size;
            Data = data;
            DateTaken = dateTaken;
        }

        public Photo(string title, bool isFavorite, ImageData imageData)
        {
            Id = Guid.NewGuid();
            DateUploaded = DateTime.UtcNow;

            Title = title;
            IsFavorite = isFavorite;
            FileName = imageData.FileName;
            MimeType = imageData.MimeType;
            Size = imageData.Size;
            Data = imageData.Data;
            DateTaken = imageData.DateTaken;
        }

        public void SetOwner(Guid userId)
        {
            OwnerId = userId;
        }

        public void SetPlace(Guid placeId) 
        {
            PlaceId = placeId;
        }

        public void SetAlbum(Guid albumId) 
        {
            AlbumId = albumId;
        }
    }
}
