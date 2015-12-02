using System;
using System.Collections.Generic;
using Domain.Entities;
using Domain.Abstract;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using RestRate.ModelView;

namespace RestRate.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        private IRestarauntRepository restRepository;
        private ICommentRepository commentRepository;
        private IImageRepository imageRepository;
        private IRestarauntLangRepository restLangRepository;
        private IUserRepository userRepository;
        public AdminController(IRestarauntRepository restRepository, IRestarauntLangRepository restLangRepository,
                                ICommentRepository commentRepository, IImageRepository imageRepository, IUserRepository userRepository)
        {
            this.restRepository = restRepository;
            this.restLangRepository = restLangRepository;
            this.commentRepository = commentRepository;
            this.imageRepository = imageRepository;
            this.userRepository = userRepository;    
        }
        // GET: Admin
        public ViewResult Index()
        {
            return View();
        }       
        public RedirectToRouteResult Logout()
        {
            var cookie = Request.Cookies[FormsAuthentication.FormsCookieName];
            var ticketInfo = FormsAuthentication.Decrypt(cookie.Value);
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Account");
        }
        [HttpPost]
        public ActionResult AddRestaurant(RestaurantData data)
        {
            if (!data.Equals(null))
            {
                try
                {
                    restRepository.SaveRestaraunt(data.RestarauntData);
                    restLangRepository.SaveRestarauntLang(data.RestaurantLangData);
                    // imageRepository.SaveImage(data.ImageData); parse image data
                    return Json(new { result = "success", message = "Restaurant was successfully added." });
                }
                catch
                {
                    return Json(new { result = "error", message = "Some troubles was happend with database." });
                }
            }
            return Json(new { result = "JSON IS NULL" });
        }
        [HttpPost]
        public ActionResult ChangePassword(ChangePasswordData data)
        {
            if (!data.Equals(null))
            {
                var cookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                var ticketInfo = FormsAuthentication.Decrypt(cookie.Value);
                if (IsPasswordValid(ticketInfo.UserData, data.OldPassword))
                {
                    User UpdateUser = userRepository.GetUserByUserName(ticketInfo.UserData);
                    UpdateUser.Password = data.NewPassword;
                    userRepository.SaveUser(UpdateUser); // update user password
                    return Json(new { result = "success", message = "Your password was changed successfuly" });
                }
                else
                {
                    return Json(new { result = "Invalid old password", message = "Wrong old password!" });
                }
            }
            return Json(new { result = "JSON IS NULL" });
        }
        private bool IsPasswordValid(string username, string password)
        {
            User tmp = userRepository.Users.Where(usr => usr.UserName == username).First();

            if(tmp.Password.Equals(password))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}