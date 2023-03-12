using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using uPhotoNG.Database;

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

        internal async Task CheckIfAuthenticated()
        {
            var result = await HttpContext.AuthenticateAsync();
            if (!result.Succeeded)
            {
                throw new Exception("User is not authenticated");
            }
        }

        internal string GetSessionUserId()
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
                        return id;
                    }
                }
            }
            throw new Exception("Id is null");
        }
    }
}
