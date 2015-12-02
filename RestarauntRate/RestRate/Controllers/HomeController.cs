using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Device.Location;

namespace RestRate.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ViewResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult SendRestarauntData(GeoCoordinate data)
        {
            return null;
        }
    }
}