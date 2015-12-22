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
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using RestRate.Infrastructure.Abstract;
using System.Data.Entity.Validation;
using System.ServiceModel.Web;

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
        private IWorkWithDBProvider workWithDBProvider;

        public AdminController(IRestarauntRepository restRepository, IRestarauntLangRepository restLangRepository,
                                ICommentRepository commentRepository, IImageRepository imageRepository, IUserRepository userRepository,
                                ILanguageRepository langRepository, IWorkWithDBProvider workWithDBProvider)
        {
            this.restRepository = restRepository;
            this.restLangRepository = restLangRepository;
            this.commentRepository = commentRepository;
            this.imageRepository = imageRepository;
            this.userRepository = userRepository;
            this.langRepository = langRepository;
            this.workWithDBProvider = workWithDBProvider;
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
            string[] cookies = Request.Cookies.AllKeys;
            foreach (string c in cookies)
            {
                Response.Cookies.Remove(c);
            }
            return RedirectToAction("Login", "Account");
        }
        [HttpPost]
        public ActionResult AddRestaurant(RestaurantData data)
        {
            if (!data.Equals(null))
            {
                try
                {
                    Restaraunt NewRestaraunt = data.RestarauntData;
                    RestarauntLang NewRestLang = data.RestaurantLangData;
                    NewRestaraunt.AddedDate = DateTime.Now;
                    NewRestaraunt.Latitude = "2";
                    NewRestaraunt.Longitude = "3";
                    NewRestaraunt.RestarauntType = Restaraunt.RestType.Bar;
                    restRepository.SaveRestaraunt(NewRestaraunt);
                    NewRestLang.LanguageID = 1;
                    NewRestLang.RestarauntID = NewRestaraunt.RestarauntID;
                    restLangRepository.SaveRestarauntLang(NewRestLang);
                    return Json(new { result = "success", id = NewRestaraunt.RestarauntID });
                }
                catch
                {
                    return Json(new { result = "error", message = "Ooooooops! Some troubles was happened with DB." });
                }
            }
            return Json(new { result = "error", message = "JSON IS NULL" });
        }
        public ActionResult EditRestaurant(RestaurantData data)
        {
            if (!data.Equals(null))
            {
                try
                {
                    Restaraunt EditRestaraunt = data.RestarauntData;
                    RestarauntLang EditRestLang = data.RestaurantLangData;
                    restRepository.SaveRestaraunt(EditRestaraunt);
                    restLangRepository.SaveRestarauntLang(EditRestLang);
                    return Json(new { result = "success" });
                }
                catch
                {
                    return Json(new { result = "error", message = "Ooooooops! Some troubles was happened with DB." });
                }
            }
            return Json(new { result = "error", message = "JSON IS NULL" });
        }
        public ActionResult DeleteRestaurant(int RestarauntID)
        {
            if (!RestarauntID.Equals(null))
            {
                try
                {
                    restRepository.DeleteRestaraunt(RestarauntID);
                    return Json(new { result = "success" });
                }
                catch
                {
                    return Json(new { result = "error", message = "Ooooooops! Some troubles was happened with DB." });
                }
            }
            return Json(new { result = "error", message = "JSON IS NULL" });
        }
        // Change path which write in db to relative
        [HttpPost]
        public ActionResult Index(IEnumerable<HttpPostedFileBase> files)
        {
            var id = Convert.ToInt32(Request.Cookies["id"].Value);
            Restaraunt Restaraunt = restRepository.GetRestarauntByID(id);
            var res = new List<HttpPostedFileBase>();
            // set path and foldername
            string FolderName = "Restaraunt" + id;
            string Folder = Server.MapPath("~/Content/Images/RestaurantImages/");
            string pathString = System.IO.Path.Combine(Folder, FolderName);
            System.IO.Directory.CreateDirectory(pathString);
            string ForSaving = Server.MapPath("~/Content/Images/RestaurantImages/" + FolderName + "/");
            //
            int counter = 0;
            foreach (var file in files)
            {
                System.Drawing.Image imageObject = new Bitmap(file.InputStream);

                string FileName = counter + ".jpg";
                string ThumbnailFileName = "small_" + counter + ".jpg";

                string Url = System.IO.Path.Combine(ForSaving, FileName);
                string ThumbnailUrl = System.IO.Path.Combine(ForSaving, ThumbnailFileName);
                counter++;

                imageObject.Save(Url, System.Drawing.Imaging.ImageFormat.Jpeg);
                GetThumbnail(imageObject, 200, 200).Save(ThumbnailUrl, System.Drawing.Imaging.ImageFormat.Jpeg);

                // adding url to DB
                // костыль. не универсальный способ для сохранения URL
                Url = System.IO.Path.Combine("http://rest-rate.azurewebsites.net/Content/Images/RestaurantImages/" + FolderName + "/", FileName);
                //
                Domain.Entities.Image New = new Domain.Entities.Image() { Url = Url, Name = FileName };
                New.RestarauntID = id;
                imageRepository.SaveImage(New);
                //

            }
            return null;
        }
        [HttpPost]
        public JsonResult GetRestaraunts()
        {
            try
            {
                int LanguageID = 1;
                List<RestarauntLang> RestarauntLangList = restLangRepository.GetAll(LanguageID);
                List<RestIDNameFullAddress> RestIDNameFullAddress = new List<RestIDNameFullAddress>();
                RestIDNameFullAddress tmp;
                foreach (var rl in RestarauntLangList)
                {
                    tmp = new RestIDNameFullAddress()
                    {
                        Address = rl.Address,
                        RestarauntID = rl.RestarauntID,
                        Locality = rl.Locality,
                        Region = rl.Region,
                        Country = rl.Country,
                        Name = rl.Name
                    };
                    RestIDNameFullAddress.Add(tmp);
                }
                return Json(new { result = RestIDNameFullAddress });
            }
            catch
            {
                return Json(new { result = "Oooops! Something wrong with DB connection." });
            }
        }
        [HttpPost]
        public ActionResult GetRestarauntInfo(int restarauntID)
        {
            try
            {
                if (!restarauntID.Equals(null))
                {
                    Restaraunt Restaraunt = restRepository.GetRestarauntByID(restarauntID);
                    RestarauntLang RestarauntLang = restLangRepository.GetRestarauntLangByID(restarauntID);
                    RestarauntAllData result = workWithDBProvider.CreateRestarauntAllData(Restaraunt, RestarauntLang);
                    return Json(new { result = result });
                }
                return Json(new { result = "JSON is null" });
            }
            catch
            {
                return Json(new { result = "NaN" });
            }
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
        [WebInvoke(Method = "DELETE", UriTemplate = "{key}")]
        [HttpDelete]
        public ActionResult ImageDelete(string key)
        {
            return Json(new { result = "success" });
        }
        private bool IsPasswordValid(string username, string password)
        {
            User tmp = userRepository.Users.Where(usr => usr.UserName == username).First();

            if (tmp.Password.Equals(password))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        private Bitmap GetThumbnail(System.Drawing.Image OldImage, int NewHeight, int NewWidth)
        {
            var bitmap = new Bitmap(NewHeight, NewWidth);
            try
            {

                using (Graphics g = Graphics.FromImage(bitmap))
                {
                    g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                    g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
                    g.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;
                    g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    g.DrawImage(OldImage,
                        new Rectangle(0, 0, NewWidth, NewHeight),
                        new Rectangle(0, 0, OldImage.Width, OldImage.Height), GraphicsUnit.Pixel);
                }
                  return bitmap;
            }
            catch
            { 
                if (bitmap != null) bitmap.Dispose();
                throw new Exception("Thumbnailing was failed.");
            }
        }
    }
}