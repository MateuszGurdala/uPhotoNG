using System.Security.Cryptography;

namespace uPhotoNG.Models
{
    public class User
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public Guid Id { get; set; }
        public string Login { get; set; }
        public byte[] Password { get; set; }
        public string Email { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        public User(string login, byte[] password, string email)
        {
            Id = Guid.NewGuid();
            Login = login;
            Password = password;
            Email = email;
        }
    }
}
