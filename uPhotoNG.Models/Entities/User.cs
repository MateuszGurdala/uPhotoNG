using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace uPhotoNG.Models.Entities
{
    public class User
    {
        [Key]
        [Column(TypeName = "char(36)")]
        public Guid Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Login { get; set; }

        [Required]
        [Column(TypeName = "binary(256)")]
        public byte[] Password { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Email { get; set; }

        [Required]
        public DateTime DateRegistered { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? Name { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? Surname { get; set; }


        public User(string login, byte[] password, string email)
        {
            Id = Guid.NewGuid();
            DateRegistered = DateTime.Now;
            Login = login;
            Password = password;
            Email = email;
        }
    }
}
