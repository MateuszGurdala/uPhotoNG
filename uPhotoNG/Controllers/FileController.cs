using Azure;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Runtime.CompilerServices;
using uPhotoNG.Database;
using uPhotoNG.Models.Entities;
using uPhotoNG.Models.Intersections;
using uPhotoNG.Models.Structs;

namespace uPhotoNG.Controllers
{
    public class FileController : CustomControllerBase
    {
        public FileController(UnitOfWork unitOfWork) : base(unitOfWork) { }

        #region CREATE
        [HttpPut]
        public async Task<IActionResult> UploadPhoto()
        {
            try
            {
                await CheckIfAuthenticatedAsync();
                var userId = GetSessionUserId();

                var body = GetRequestBody();

                if (body != null)
                {
                    FileHttpData fileData = JsonConvert.DeserializeObject<FileHttpData>(Convert.ToString(body));

                    var targetAlbumId = fileData.GetAlbumId();
                    var album = _unitOfWork.AlbumRepository.GetSingle(e => e.Id == targetAlbumId);

                    var targetPlaceId = fileData.GetPlaceId();

                    var photo = new Photo(fileData.title, fileData.isFavorite, fileData.GetImageData());

                    photo.SetOwner(userId);
                    photo.SetAlbum(targetAlbumId);
                    photo.SetPlace(targetPlaceId);

                    var tags = ParseTags(fileData.tags);

                    foreach (var tag in tags)
                    {
                        var photoTag = new PhotoTag(photo, tag);

                        tag.IncrementTimesUsed();

                        _unitOfWork.PhotoTagRepository.Insert(photoTag);
                        _unitOfWork.TagRepository.Update(tag);
                    }

                    album.IncrementPhotoCount();

                    _unitOfWork.AlbumRepository.Update(album);
                    _unitOfWork.PhotoRepository.Insert(photo);

                    _unitOfWork.Save();

                    return Json(true);

                }
                else
                {
                    throw new Exception();
                }

            }
            catch (Exception)
            {
                return StatusCode(400);
            }
        }

        private List<Tag> ParseTags(string tagsStr)
        {
            var photoTags = new List<Tag>();

            foreach (var tagStr in tagsStr.Split('#'))
            {
                var tag = _unitOfWork.TagRepository.GetSingle(e => e.Value == tagStr);
                if (tag == null)
                {
                    tag = new Tag(tagStr);
                    _unitOfWork.TagRepository.Insert(tag);
                }
                photoTags.Add(tag);
            }
            _unitOfWork.Save();

            return photoTags;
        }
        #endregion
    }
}
