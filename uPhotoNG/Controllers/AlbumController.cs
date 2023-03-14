using Microsoft.AspNetCore.Mvc;
using uPhotoNG.Database;
using uPhotoNG.Models.Interfaces;

namespace uPhotoNG.Controllers
{
    public class AlbumController : CustomControllerBase
    {
        public AlbumController(UnitOfWork unitOfWork) : base(unitOfWork) { }

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
    }
}
