using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace test1.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        List<HttpPostedFileBase> res = new List<HttpPostedFileBase>();
        [HttpPost]
        public ActionResult Index(HttpPostedFileBase[] file1)
        {
             
            foreach (var file in file1)
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
    }
}