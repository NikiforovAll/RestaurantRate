using System;
using System.Collections.Generic;
using Domain.Entities;
using Domain.Abstract;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Domain.Concrete;
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
                    data.RestaurantLangData.RestarauntID = data.RestarauntData.RestarauntID;
                    restLangRepository.SaveRestarauntLang(data.RestaurantLangData);
                    /* HttpPostedFileBase MyFile = null;
            int Number = Request.Files.Count;
            Restaraunt tmp;
            string ForSaving = Server.MapPath("~/Content/Images/RestaurantImages");
            using (var context = new EFDbContext())
            {
                tmp = context.Restaraunts.Where(rest => rest.RestarauntID == 1).First();

                if (Number != 0)
                {
                    for (int i = 0; i < Number; i++)
                    {

                        MyFile = Request.Files[i];
                        string FileName = "Restaraunt" + 0 + "Image" + i + System.IO.Path.GetExtension(MyFile.FileName);
                        string url = System.IO.Path.Combine(ForSaving, FileName);
                        Image New = new Image() { Url = url };
                        New.RestarauntID = 0;                        
                        tmp.Images.Add(New);      
                        restRepository.SaveRestaraunt(tmp);
                        MyFile.SaveAs(url);
                    }
                }
            }
            */
                    //imageRepository.SaveImage()
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
        public ActionResult UploadFile()
        {
            HttpPostedFileBase MyFile = null;
            int Number = Request.Files.Count;
            Restaraunt tmp;
            string ForSaving = Server.MapPath("~/Content/Images/RestaurantImages");
            using (var context = new EFDbContext())
            {
                tmp = context.Restaraunts.Where(rest => rest.RestarauntID == 1).First();

                if (Number != 0)
                {
                    for (int i = 0; i < Number; i++)
                    {

                        MyFile = Request.Files[i];
                        string FileName = "Restaraunt" + 0 + "Image" + i + System.IO.Path.GetExtension(MyFile.FileName);
                        string url = System.IO.Path.Combine(ForSaving, FileName);
                        Image New = new Image() { Url = url };
                        New.RestarauntID = 0;                        
                        tmp.Images.Add(New);      
                        restRepository.SaveRestaraunt(tmp);
                        MyFile.SaveAs(url);
                    }
                }
            }
            return null;
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