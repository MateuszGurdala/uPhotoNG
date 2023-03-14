using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using uPhotoNG.Database;
using uPhotoNG.Models.Entities;

namespace uPhotoNG.Controllers
{
    public class CustomControllerBase : Controller
    {
        internal UnitOfWork _unitOfWork;

        public CustomControllerBase(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        internal dynamic GetRequestBody()
        {
            StreamReader reader = new StreamReader(Request.Body);
            var text = reader.ReadToEndAsync().Result;
            return JObject.Parse(text);
        }

        internal async Task CheckIfAuthenticatedAsync()
        {
            var result = await HttpContext.AuthenticateAsync();
            if (!result.Succeeded)
            {
                throw new Exception("User is not authenticated");
            }
        }

        internal Guid GetSessionUserId()
        {
            var authFeatures = HttpContext.Features.Get<IAuthenticateResultFeature>();
            if (authFeatures != null && authFeatures.AuthenticateResult != null)
            {
                var prop = authFeatures.AuthenticateResult.Properties;
                if (prop != null && prop.Items != null)
                {
                    var id = prop.Items["Id"];
                    if (id != null)
                    {
                        return Guid.Parse(id);
                    }
                }
            }
            throw new Exception("Id is null");
        }

        internal async Task<IEnumerable<Album>> GetUserAlbumsAsync()
        {
            try
            {
                await CheckIfAuthenticatedAsync();

                var userId = GetSessionUserId();

                List<Album> albums = new List<Album>();
                var userAlbumsQuery = _unitOfWork.UserAlbumRepository.Get(e => e.UserId == userId);
                var queryData = _unitOfWork.UserAlbumRepository.Join<Album>(userAlbumsQuery, ua => ua.AlbumId, a => a.Id);

                foreach (var obj in queryData)
                {
                    albums.Add(obj.Item2);
                }

                return albums;
            }
            catch (Exception)
            {

                throw new Exception("User is not authenticated");
            }
        }

        internal async Task<IEnumerable<Place>> GetUserPlacesAsync()
        {
            try
            {
                await CheckIfAuthenticatedAsync();

                var userId = GetSessionUserId();

                List<Place> places = new List<Place>();
                var userAlbumsQuery = _unitOfWork.UserPlaceRepository.Get(e => e.UserId == userId);
                var queryData = _unitOfWork.UserPlaceRepository.Join<Place>(userAlbumsQuery, up => up.PlaceId, p => p.Id);

                foreach (var obj in queryData)
                {
                    places.Add(obj.Item2);
                }

                return places;
            }
            catch (Exception)
            {

                throw new Exception("User is not authenticated");
            }
        }
    }
}
