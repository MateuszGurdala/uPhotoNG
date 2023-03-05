using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using uPhotoNG.Database;
using uPhotoNG.Models;

namespace uPhotoNG.Controllers
{
    public class AccountController : CustomControllerBase
    {
        public AccountController(UnitOfWork unitOfWork) : base(unitOfWork) { }

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
                _unitOfWork.UserRepository.Insert(user);
                _unitOfWork.Save();

                HttpContext.Response.StatusCode = 200;
                return Json(true);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
