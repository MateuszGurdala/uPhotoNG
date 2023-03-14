using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using uPhotoNG.Database;
using uPhotoNG.Models.Entities;
using uPhotoNG.Models.Intersections;

namespace uPhotoNG.Controllers
{
    public class AccountController : CustomControllerBase
    {
        private AuthenticationProperties _authProperties;

        public AccountController(UnitOfWork unitOfWork) : base(unitOfWork)
        {
            _authProperties = new AuthenticationProperties()
            {
                AllowRefresh = true,
                IssuedUtc = DateTime.UtcNow,
                ExpiresUtc = DateTime.UtcNow.AddMinutes(10),
                IsPersistent = false
            };
        }

        [HttpGet]
        public IActionResult CheckLoginAvailable(string login)
        {
            if (login == null)
            {
                return StatusCode(400);
            }

            return _unitOfWork.UserRepository.GetSingle(e => e.Login == login) == null ? Json(true) : Json(false);
        }

        [HttpGet]
        public IActionResult CheckEmailAvailable(string email)
        {

            if (email == null)
            {
                return StatusCode(400);
            }

            return _unitOfWork.UserRepository.GetSingle(e => e.Email == email) == null ? Json(true) : Json(false);
        }

        [HttpPut]
        public IActionResult CreateAccount()
        {
            var reqBody = GetRequestBody();
            string login = reqBody.login;
            string password = reqBody.password;
            string confirmation = reqBody.confirmation;
            string email = reqBody.email;

            if (login == null || _unitOfWork.UserRepository.GetSingle(e => e.Login == login) != null)
            {
                return StatusCode(400);
            }

            if (reqBody.email == null || _unitOfWork.UserRepository.GetSingle(e => e.Email == email) != null)
            {
                return StatusCode(400);
            }

            if (password == null || confirmation == null || password != confirmation)
            {
                return StatusCode(400);
            }

            var hash = SHA256.HashData(Encoding.ASCII.GetBytes(password));

            try
            {
                var user = new User(login, hash, email);

                var defaultAlbum = Album.CreateDefaultAlbum(user);
                var defaultPlace = Place.CreateDefaultPlace(user);

                var userAlbum = new UserAlbum(user, defaultAlbum);
                var userPlace = new UserPlace(user, defaultPlace);


                _unitOfWork.UserRepository.Insert(user);
                _unitOfWork.AlbumRepository.Insert(defaultAlbum);
                _unitOfWork.PlaceRepository.Insert(defaultPlace);

                _unitOfWork.UserAlbumRepository.Insert(userAlbum);
                _unitOfWork.UserPlaceRepository.Insert(userPlace);

                _unitOfWork.Save();

                HttpContext.Response.StatusCode = 200;
                return Json(true);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpGet]
        public async Task<IActionResult> SignIn(string login, string password)
        {
            if (login == null || password == null)
            {
                return StatusCode(400);
            }

            var userAccount = _unitOfWork.UserRepository.GetSingle(e => e.Login == login && e.Password == SHA256.HashData(Encoding.ASCII.GetBytes(password)));

            if (userAccount == null)
            {
                return Json(false);
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, "User"),
                new Claim(ClaimTypes.Email, userAccount.Email)
            };
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = _authProperties.Clone();
            authProperties.IssuedUtc = DateTime.UtcNow;
            authProperties.ExpiresUtc = DateTime.UtcNow.AddMinutes(10);
            authProperties.Items.Add("Id", userAccount.Id.ToString());

            await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity),
            authProperties);

            return Json(true);
        }

        [HttpGet]
#pragma warning disable CS0114 // Member hides inherited member; missing override keyword
        public async Task<IActionResult> SignOut()
#pragma warning restore CS0114 // Member hides inherited member; missing override keyword
        {
            try
            {
                await CheckIfAuthenticatedAsync();
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

                return Json(true);
            }
            catch (Exception)
            {
                return StatusCode(400);
            }
        }

        [HttpGet]
        public async Task<IActionResult> ValidateAuthentication()
        {
            try
            {
                await CheckIfAuthenticatedAsync();
                return Json(true);
            }
            catch (Exception)
            {
                return Json(false);
            }
        }
    }
}
