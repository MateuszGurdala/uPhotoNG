using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace uPhotoNG.Models.Entities
{
    public class Tag
    {
        [Key]
        [Column(TypeName = "varchar(20)")]
        public string Value { get; set; }

        [Required]
        public int TimesUsed { get; set; }

        public Tag(string value)
        {
            Value = value;
            TimesUsed = 0;
        }

        public int IncrementTimesUsed()
        {
            TimesUsed++;
            return TimesUsed;
        }

        public int DecrementTimesUsed()
        {
            TimesUsed--;
            return TimesUsed;
        }
    }
}
