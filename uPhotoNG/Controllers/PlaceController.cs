using Microsoft.AspNetCore.Mvc;
using uPhotoNG.Database;
using uPhotoNG.Models.Interfaces;

namespace uPhotoNG.Controllers
{
    public class PlaceController : CustomControllerBase
    {
        public PlaceController(UnitOfWork unitOfWork) : base(unitOfWork){}

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
    }
}
