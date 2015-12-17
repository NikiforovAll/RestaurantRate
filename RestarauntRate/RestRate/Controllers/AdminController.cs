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
using System.Data.Entity.Validation;

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
                    using (var context = new EFDbContext())
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

                // adding url to DB
                Domain.Entities.Image New = new Domain.Entities.Image() { Url = Url };
                New.RestarauntID = id;
                imageRepository.SaveImage(New);
                //

                imageObject.Save(Url, System.Drawing.Imaging.ImageFormat.Jpeg);
                GetThumbnail(imageObject, 200, 200).Save(ThumbnailUrl, System.Drawing.Imaging.ImageFormat.Jpeg);

            }
            return null;
        }
        [HttpPost]
        public JsonResult GetRestaraunts()
        {
            List<RestarauntLang> RestarauntLangList = restLangRepository.GetAll();
            List<RestIDNameAddress> RestIDNameAddress = new List<RestIDNameAddress>();
            RestIDNameAddress tmp;
            foreach (var rl in RestarauntLangList)
            {
                tmp = new RestIDNameAddress();
                tmp.Address = rl.Address;
                tmp.RestarauntID = rl.RestarauntID;
                tmp.Name = rl.Name;
                RestIDNameAddress.Add(tmp);
            }
            return Json(new { result = RestIDNameAddress } );
        }
        [HttpPost]
        public ActionResult GetRestarauntInfo(string id)
        {
            try
            {
                int ID = Convert.ToInt32(id);
                if (!id.Equals(null))
                {
                    Restaraunt Restaraunt = restRepository.GetRestarauntByID(ID);
                    RestarauntLang RestarauntLang = restLangRepository.GetRestarauntLangByID(ID);
                    RestarauntAllData result = new RestarauntAllData();
                    result.Address = RestarauntLang.Address;
                    result.Country = RestarauntLang.Country;
                    result.Locality = RestarauntLang.Locality;
                    result.Region = RestarauntLang.Region;
                    result.Review = RestarauntLang.Review;
                    result.Name = RestarauntLang.Name;
                    result.Longitude = Restaraunt.Longitude;
                    result.Latitude = Restaraunt.Latitude;
                    result.KitchenRate = Restaraunt.KitchenRate;
                    result.InteriorRate = Restaraunt.InteriorRate;
                    result.MaintenanceRate = Restaraunt.MaintenanceRate;
                    result.RestarauntType = Restaraunt.RestarauntType;
                    result.Images = imageRepository.GetRestarauntImages(ID);

                    return Json(new { result = result });
                }
                return Json(new { result = "ERROR" });
            }
            catch
            {
                return Json(new { result = "NoN" });
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