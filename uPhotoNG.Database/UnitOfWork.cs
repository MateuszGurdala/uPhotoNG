using uPhotoNG.Models.Entities;
using uPhotoNG.Models.Intersections;

namespace uPhotoNG.Database
{
    public class UnitOfWork : IDisposable
    {
        private bool disposed = false;
        private ApplicationDbContext _context;

        //Entity
        private GenericRepository<User>? _userRepository;
        private GenericRepository<Album>? _albumRepository;
        private GenericRepository<Place>? _placeRepository;
        private GenericRepository<Tag>? _tagRepository;
        private GenericRepository<Photo>? _photoRepository;

        //Intersection
        private GenericRepository<PhotoTag>? _photoTagRepository;
        private GenericRepository<UserAlbum>? _userAlbumRepository;
        private GenericRepository<UserPlace>? _userPlaceRepository;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        //Entity
        public GenericRepository<User> UserRepository
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new GenericRepository<User>(_context);
                }
                return _userRepository;
            }
        }
        public GenericRepository<Album> AlbumRepository
        {
            get
            {
                if (_albumRepository == null)
                {
                    _albumRepository = new GenericRepository<Album>(_context);
                }
                return _albumRepository;
            }
        }
        public GenericRepository<Place> PlaceRepository
        {
            get
            {
                if (_placeRepository == null)
                {
                    _placeRepository = new GenericRepository<Place>(_context);
                }
                return _placeRepository;
            }
        }
        public GenericRepository<Tag> TagRepository
        {
            get
            {
                if (_tagRepository == null)
                {
                    _tagRepository = new GenericRepository<Tag>(_context);
                }
                return _tagRepository;
            }
        }
        public GenericRepository<Photo> PhotoRepository
        {
            get
            {
                if (_photoRepository == null)
                {
                    _photoRepository = new GenericRepository<Photo>(_context);
                }
                return _photoRepository;
            }
        }

        //Intersection
        public GenericRepository<PhotoTag> PhotoTagRepository
        {
            get
            {
                if (_photoTagRepository == null)
                {
                    _photoTagRepository = new GenericRepository<PhotoTag>(_context);
                }
                return _photoTagRepository;
            }
        }
        public GenericRepository<UserAlbum> UserAlbumRepository
        {
            get
            {
                if (_userAlbumRepository == null)
                {
                    _userAlbumRepository = new GenericRepository<UserAlbum>(_context);
                }
                return _userAlbumRepository;
            }
        }
        public GenericRepository<UserPlace> UserPlaceRepository
        {
            get
            {
                if (_userPlaceRepository == null)
                {
                    _userPlaceRepository = new GenericRepository<UserPlace>(_context);
                }
                return _userPlaceRepository;
            }
        }

        public void Save()
        {
            _context.SaveChanges();
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
