using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Runtime.InteropServices.JavaScript;
using uPhotoNG.Database;
using uPhotoNG.Models.Entities;
using uPhotoNG.Models.Interfaces;
using uPhotoNG.Models.Intersections;

namespace uPhotoNG.Controllers
{
    public class AlbumController : CustomControllerBase
    {
        public AlbumController(UnitOfWork unitOfWork) : base(unitOfWork) { }

        #region READ
        [HttpGet]
        public async Task<IActionResult> GetUserAlbums()
        {
            try
            {
                var albums = await GetUserAlbumsAsync() as IEnumerable<IDatabaseOption>;
                return Json(albums.Select(e => e.GetAsDbOption()).ToList());
            }
            catch (Exception)
            {
                return StatusCode(400);
            }
        }
        #endregion

        #region CREATE
        [HttpPut]
        public async Task<IActionResult> PutAlbumTest()
        {
            try
            {
                await CheckIfAuthenticatedAsync();
                var userId = GetSessionUserId();

                var requestBody = GetRequestBody();
                string? albumName = requestBody.albumName;

                if (albumName == null)
                {
                    return Json(true);
                }

                var userAlbums = await GetUserAlbumsAsync();

                if (userAlbums.FirstOrDefault(e => e.Name == albumName) == null)
                {
                    var album = new Album(albumName, "Album created via test method. Should be deleted.");
                    var user = _unitOfWork.UserRepository.GetSingle(e => e.Id == userId);

                    if (user != null)
                    {
                        album.SetOwner(user);
                        var userAlbum = new UserAlbum(user, album);

                        _unitOfWork.AlbumRepository.Insert(album);
                        _unitOfWork.UserAlbumRepository.Insert(userAlbum);

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
        public async Task<IActionResult> DeleteAlbumTest(string id)
        {
            try
            {
                await CheckIfAuthenticatedAsync();
                var userId = GetSessionUserId();

                var albumId = Guid.Parse(id);
                var album = _unitOfWork.AlbumRepository.GetSingle(e => e.Id == albumId && e.OwnerId == userId);

                if (album != null && !album.IsSystemAlbum)
                {
                    //Move photos to user corresponding DeletedPhotos album
                    MovePhotosToDeleteAlbum(albumId);

                    _unitOfWork.AlbumRepository.Delete(album);
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

        private void MovePhotosToDeleteAlbum(Guid deltedAlbumId)
        {
            var deletedAlbumPhotos = _unitOfWork.PhotoRepository.Get(e => e.Id == deltedAlbumId);
            var deletedPhotosAlbums = new List<Album>();

            foreach (var deletedPhoto in deletedAlbumPhotos)
            {
                var targetAlbum = deletedPhotosAlbums.FirstOrDefault(e => e.OwnerId == deletedPhoto.OwnerId);

                //Add user target album if not in list
                if (targetAlbum == null)
                {
                    var deletedAlbum = _unitOfWork.AlbumRepository.GetSingle(e => IsDeletedPhotosAlbum(e, deletedPhoto.OwnerId));
                    if (deletedAlbum == null)
                    {
                        throw new DeletedPhotosSystemAlbumNotFound();
                    }
                    deletedPhotosAlbums.Add(deletedAlbum);
                    targetAlbum = deletedAlbum;
                }

                deletedPhoto.AlbumId = targetAlbum.Id;
                _unitOfWork.PhotoRepository.Update(deletedPhoto);
            }
        }

        private bool IsDeletedPhotosAlbum(Album e, Guid ownerId)
        {
            return (e.IsSystemAlbum && e.Name == "DeletedPhotos" && e.OwnerId == ownerId);
        }
        #endregion
    }
    #region Errors
    internal class DeletedPhotosSystemAlbumNotFound : Exception
    {
        public DeletedPhotosSystemAlbumNotFound() { }
    }
    #endregion
}
