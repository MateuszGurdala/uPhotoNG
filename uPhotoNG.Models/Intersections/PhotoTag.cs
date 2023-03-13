using System.ComponentModel.DataAnnotations.Schema;
using uPhotoNG.Models.Entities;

namespace uPhotoNG.Models.Intersections
{
    public class PhotoTag
    {
        [ForeignKey("Photo")]
        public Guid PhotoId { get; set; }
        public Photo? Photo { get; set; }

        [ForeignKey("Tag")]
        [Column(TypeName = "varchar(20)")]
        public string TagValue { get; set; }
        public Tag? Tag { get; set; }


        public PhotoTag(Guid photoId, string tagValue)
        {
            PhotoId = photoId;
            TagValue = tagValue;
        }

        public PhotoTag(Photo photo, Tag tag)
        {
            PhotoId = photo.Id;
            TagValue = tag.Value;
        }
    }
}
