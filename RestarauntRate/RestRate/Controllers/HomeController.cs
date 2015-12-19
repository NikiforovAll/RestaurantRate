using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Device.Location;
using RestRate.Infrastructure.Abstract;
using RestRate.ModelView;
using Domain.Abstract;
using Domain.Entities;

namespace RestRate.Controllers
{
    public class HomeController : Controller
    {
        private IRestarauntRepository restRepository;
        private ICommentRepository commentRepository;
        private IImageRepository imageRepository;
        private IRestarauntLangRepository restLangRepository;
        private IUserRepository userRepository;
        private ILanguageRepository langRepository;
        private IWorkWithDBProvider workWithDBProvider;

        public HomeController(IRestarauntRepository restRepository, IRestarauntLangRepository restLangRepository,
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
        // GET: Home
        public ViewResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult GetAllRestaurants()
        {

                int LanguageID = 1;
            try
            {
                List<RestarauntLang> RestarauntLangList = restLangRepository.GetAll(LanguageID);
                List<Restaraunt> RestarauntList = restRepository.GetAll();
                List<RestIDNameFullAddressRates> RestIDNameFullAddressRates = new List<RestIDNameFullAddressRates>();
                RestIDNameFullAddressRates tmp;
                // повышаем производительность поскольку с учетом выбора конкретного языка
                // мн -во RestarauntList[i] будет прямо соответсвовать RestarauntLangList[i].
                // Быть осторожным с удалением. Нельзя давать возможность удалить RestarauntLangList[i] 
                // для какого то конкретного языка. Если удалять, то удалять только RestarauntList[i] и все RestarauntLangList[i] 
                for (int i = 0; i < RestarauntList.Count; i++) 
                {
                    tmp = new RestIDNameFullAddressRates();
                    tmp.InteriorRate = RestarauntList[i].InteriorRate;
                    tmp.KitchenRate = RestarauntList[i].KitchenRate;
                    tmp.MaintenanceRate = RestarauntList[i].MaintenanceRate;
                    tmp.RestIDNameFullAddress.Address = RestarauntLangList[i].Address;
                    tmp.RestIDNameFullAddress.RestarauntID = RestarauntList[i].RestarauntID;
                    tmp.RestIDNameFullAddress.Name = RestarauntLangList[i].Name;
                    tmp.RestIDNameFullAddress.Country = RestarauntLangList[i].Country;
                    tmp.RestIDNameFullAddress.Locality = RestarauntLangList[i].Locality;
                    tmp.RestIDNameFullAddress.Region = RestarauntLangList[i].Region;
                    RestIDNameFullAddressRates.Add(tmp);
                }
                return Json(new { result = RestIDNameFullAddressRates });
            }
            catch
            {
                return Json(new { result = "Oooops! Something wrong with DB connection." });
            }
        }
        [HttpPost]
        public ActionResult GetRestaurantsWithinRadius(GeoCoordinates geoCoordinates)
        {
            int LanguageID = 1;
            const double radius = 200;
            try
            {
                double Longtitude = Convert.ToDouble(geoCoordinates.Longitude);
                double Latitude = Convert.ToDouble(geoCoordinates.Latitude);
                List<Restaraunt> RestarauntList = restRepository.GetAllWithinRadius(Latitude, Longtitude, radius);
                int[] RestarauntIDArray = new int[RestarauntList.Count];
                for (int i = 0; i < RestarauntIDArray.Length; i++) // подумать над оптимизацией
                {
                    RestarauntIDArray[i] = RestarauntList[i].RestarauntID;
                }
                List<RestarauntLang> RestarauntLangList = restLangRepository.GetAllWithinRadius(RestarauntIDArray, LanguageID);
                List<RestIDNameFullAddressRates> RestIDNameFullAddressRates = new List<RestIDNameFullAddressRates>();
                RestIDNameFullAddressRates tmp;
                for (int i = 0; i < RestarauntList.Count; i++)
                {
                    tmp = new RestIDNameFullAddressRates();
                    tmp.InteriorRate = RestarauntList[i].InteriorRate;
                    tmp.KitchenRate = RestarauntList[i].KitchenRate;
                    tmp.MaintenanceRate = RestarauntList[i].MaintenanceRate;
                    tmp.RestIDNameFullAddress.Region = RestarauntLangList[i].Region;
                    tmp.RestIDNameFullAddress.Name = RestarauntLangList[i].Name;
                    tmp.RestIDNameFullAddress.Country = RestarauntLangList[i].Country;
                    tmp.RestIDNameFullAddress.Locality = RestarauntLangList[i].Locality;
                    RestIDNameFullAddressRates.Add(tmp);
                }
                return Json(new { result = RestIDNameFullAddressRates });
            }
            catch
            {
                return Json(new { result = "Oooops! Something wrong with DB connection." });
            }
        }
        [HttpPost]
        public ActionResult GetRestaurantInfo(int restarauntID)
        {
            try
            {
                if (!restarauntID.Equals(null))
                {
                    Restaraunt Restaraunt = restRepository.GetRestarauntByID(restarauntID);
                    RestarauntLang RestarauntLang = restLangRepository.GetRestarauntLangByID(restarauntID);
                    RestarauntAllData result = workWithDBProvider.CreateRestarauntAllData(Restaraunt, RestarauntLang);
                    string tmp = String.Empty;
                    foreach (var image in result.Images) // need debug. подумать как упростить
                    {
                        for (int i = image.Url.Length-1; i >= 0; i--)
                        {
                            if (image.Url[i].Equals('\\'))
                            {
                                image.Url = image.Url.Remove(i + 1) + "small_" + tmp;
                            }
                            else
                            {
                                tmp += image.Url[i];
                            }
                        }
                    }
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
        public ActionResult GetRestaurantGallery(int restarauntID)
        {
            try
            {
                List<Image> result = new List<Image>();
                result = imageRepository.GetRestarauntImages(restarauntID);
                return Json(new { result = result });
            }
            catch
            {
                return Json(new { result = "Oooops! Something wrong with DB connection." });
            }
        }
    }
}