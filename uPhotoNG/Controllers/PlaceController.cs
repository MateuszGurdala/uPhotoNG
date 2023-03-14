using Microsoft.AspNetCore.Mvc;
using uPhotoNG.Database;
using uPhotoNG.Models.Entities;
using uPhotoNG.Models.Interfaces;
using uPhotoNG.Models.Intersections;

namespace uPhotoNG.Controllers
{
    public class PlaceController : CustomControllerBase
    {
        public PlaceController(UnitOfWork unitOfWork) : base(unitOfWork) { }

        #region READ
        [HttpGet]
        public async Task<IActionResult> GetUserPlaces()
        {
            try
            {
                var places = await GetUserPlacesAsync() as IEnumerable<IDatabaseOption>;
                return Json(places.Select(e => e.GetAsDbOption()).ToList());
            }
            catch (Exception)
            {
                return StatusCode(400);
            }
        }
        #endregion

        #region CREATE
        [HttpPut]
        public async Task<IActionResult> PutPlaceTest()
        {
            try
            {
                await CheckIfAuthenticatedAsync();
                var userId = GetSessionUserId();

                var requestBody = GetRequestBody();
                string? placeName = requestBody.placeName;

                if (placeName == null)
                {
                    return Json(true);
                }

                var userPlaces = await GetUserPlacesAsync();

                if (userPlaces.FirstOrDefault(e => e.Name == placeName) == null)
                {
                    var place = new Place(placeName, false, "Place created via test method. Should be deleted.");
                    var user = _unitOfWork.UserRepository.GetSingle(e => e.Id == userId);

                    if (user != null)
                    {
                        place.SetCreator(user);
                        var userPlace = new UserPlace(user, place);

                        _unitOfWork.PlaceRepository.Insert(place);
                        _unitOfWork.UserPlaceRepository.Insert(userPlace);

                        _unitOfWork.Save();

                        return Json(true);
                    }
                }
                return Json(false);
            }
            catch (Exception)
            {
                return StatusCode(400);
            }
        }
        #endregion

        #region DELETE
        [HttpDelete]
        public async Task<IActionResult> DeletePlaceTest(string id)
        {
            try
            {
                await CheckIfAuthenticatedAsync();
                var userId = GetSessionUserId();

                var placeId = Guid.Parse(id);
                var place = _unitOfWork.PlaceRepository.GetSingle(e => e.Id == placeId);

                if (place != null && !place.IsSystemPlace)
                {
                    SetDefaultPlace(placeId);

                    _unitOfWork.PlaceRepository.Delete(place);
                    _unitOfWork.Save();

                    return Json(true);
                }
                else
                {
                    return Json(false);
                }
            }
            catch (DeletedPhotosSystemAlbumNotFound)
            {
                return StatusCode(500);
            }
            catch (Exception)
            {
                return StatusCode(400);
            }
        }

        private void SetDefaultPlace(Guid placeId)
        {
            var deletedPlacePhotos = _unitOfWork.PhotoRepository.Get(e => e.PlaceId == placeId);
            var defaultPlaces = new List<Place>();

            foreach (var photoToMove in deletedPlacePhotos)
            {
                var targetPlace = defaultPlaces.FirstOrDefault(e => e.CreatedBy == photoToMove.OwnerId);

                //Add user target album if not in list
                if (targetPlace == null)
                {
                    var defaultPlace = _unitOfWork.PlaceRepository.GetSingle(e => IsDefaultPlace(e, photoToMove.OwnerId));
                    if (defaultPlace == null)
                    {
                        throw new DefaultPlaceNotFound();
                    }
                    defaultPlaces.Add(defaultPlace);
                    targetPlace = defaultPlace;
                }

                photoToMove.AlbumId = targetPlace.Id;
                _unitOfWork.PhotoRepository.Update(photoToMove);
            }
        }

        private bool IsDefaultPlace(Place e, Guid ownerId)
        {
            return (e.IsSystemPlace && e.CreatedBy == ownerId);
        }
        #endregion
    }
    #region Errors
    internal class DefaultPlaceNotFound : Exception
    {
        public DefaultPlaceNotFound() { }
    }
    #endregion
}
