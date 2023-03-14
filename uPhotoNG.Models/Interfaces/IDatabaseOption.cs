using uPhotoNG.Models.Structs;

namespace uPhotoNG.Models.Interfaces
{
    public interface IDatabaseOption
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public virtual DatabaseOption GetAsDbOption()
        {
            return new DatabaseOption()
            {
                id = Id.ToString(),
                value = Name
            };
        }
    }
}
