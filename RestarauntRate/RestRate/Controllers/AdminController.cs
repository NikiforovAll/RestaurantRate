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
using System.Data.Entity.Validation;
using System.Diagnostics;

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
        private ILanguageRepository langRepository;
        public AdminController(IRestarauntRepository restRepository, IRestarauntLangRepository restLangRepository,
                                ICommentRepository commentRepository, IImageRepository imageRepository, IUserRepository userRepository, ILanguageRepository langRepository)
        {
            this.restRepository = restRepository;
            this.restLangRepository = restLangRepository;
            this.commentRepository = commentRepository;
            this.imageRepository = imageRepository;
            this.userRepository = userRepository;
            this.langRepository = langRepository;
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
        List<Image> Images = new List<Image>();
        [HttpPost]
        public ActionResult AddRestaurant(RestaurantData data)
        {
            var tmp = Images;
            if (!data.Equals(null))
            {
                try
                {
                    /* using (var context = new EFDbContext())
                     {

                         Restaraunt NewRestaraunt = data.RestarauntData;
                         RestarauntLang NewRestLang = data.RestaurantLangData;

                         Language Test = context.Languages.Where(t => t.LanguageID == 7).First();

                         NewRestaraunt.AddedDate = DateTime.Now;
                         NewRestaraunt.Latitude = "2";
                         NewRestaraunt.Longitude = "3";
                         NewRestaraunt.RestarauntType = Restaraunt.RestType.Bar;

                         restRepository.SaveRestaraunt(NewRestaraunt);

                         NewRestLang.LanguageID = 7;
                         NewRestLang.RestarauntID = NewRestaraunt.RestarauntID;

                         restLangRepository.SaveRestarauntLang(NewRestLang);


                         return Json(new { result = "success", id = NewRestaraunt.RestarauntID });
                     }*/
                    return null;
                    /* HttpPostedFileBase MyFile = null;
                int Number = Request.Files.Count;
                Restaraunt tmp;
                string ForSaving = Server.MapPath("~/Content/Images/RestaurantImages");
                using (var context = new EFDbContext())
                {

                    if (Number != 0)
                    {
                        for (int i = 0; i < Number; i++)
                        {

                            MyFile = Request.Files[i];
                            string FileName = "Restaraunt" + 0 + "Image" + i + System.IO.Path.GetExtension(MyFile.FileName);
                            string url = System.IO.Path.Combine(ForSaving, FileName);
                            Image New = new Image() { Url = url };
                            New.RestarauntID = 0;                          
                            NewRestaraunt.Images.Add(New);   
                            restRepository.SaveRestaraunt(tmp);
                            MyFile.SaveAs(url);
                        }
                    }
                }
                */
                }
                catch (DbEntityValidationException dbEx)
                {
                    foreach (var validationErrors in dbEx.EntityValidationErrors)
                    {
                        foreach (var validationError in validationErrors.ValidationErrors)
                        {
                            Trace.TraceInformation("Property: {0} Error: {1}",
                                                    validationError.PropertyName,
                                                    validationError.ErrorMessage);
                        }
                    }
                    return Json(new { result = "error", message = "Ooooooops! Some troubles was happened with DB." });
                }
            }
            return Json(new { result = "error", message = "JSON IS NULL" });
        }

        [HttpPost]
        public ActionResult Index(IEnumerable<HttpPostedFileBase> files)//ImageData data)
        {
           // int RestarauntID = data.RestarauntID;
            var res = new List<HttpPostedFileBase>();
            foreach (var file in files)//data.files)
            {
                if (file.ContentLength < 0)
                {
                    continue;
                }
                res.Add(file);
                // do something with the file
            }
            return null;
        }

        [HttpPost]
        public ActionResult UploadFile(IEnumerable<HttpFileCollectionBase> files)
        {
            var a = Request.Files;
            // TimeStamp
            long ticks = DateTime.UtcNow.Ticks - DateTime.Parse("01/01/1970 00:00:00").Ticks;
            ticks /= 10000000; //Convert windows ticks to seconds
            var timestamp = ticks.ToString();
            //
            HttpPostedFileBase MyFile = Request.Files[0];

            string FileName = 0 + timestamp + System.IO.Path.GetExtension(MyFile.FileName);


            string ForSaving = Server.MapPath("~/Content/Images/RestaurantImages/"+0);
            string Url = System.IO.Path.Combine(ForSaving, FileName);
            Image New = new Image() { Url = Url };
            Images.Add(New);

            /* Restaraunt tmp;
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
             }*/
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