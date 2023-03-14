using Microsoft.AspNetCore.Mvc;
using uPhotoNG.Database;

namespace uPhotoNG.Controllers
{
    public class FileController : CustomControllerBase
    {
        public FileController(UnitOfWork unitOfWork) : base(unitOfWork) { }

        //[HttpPost]
        //public async Task<IActionResult> UploadPhoto()
        //{
        //    try
        //    {
        //        await CheckIfAuthenticatedAsync();
        //        var userId = GetSessionUserId();


        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(400);
        //    }
        //}
    }
}
