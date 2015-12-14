using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Domain.Entities;

namespace RestRate.ModelView
{
    public class RestaurantData
    {
        public RestarauntInfo extradata { get; set; }
        public IEnumerable<HttpPostedFileBase> files { get; set; }
    }
    public class Megalol
    {
        public int KitchenRate { get; set; }
        public int MaintenanceRate { get; set; }
    }
    public class RestarauntInfo
    {
          public Restaraunt RestarauntData { get; set; }
          public RestarauntLang RestaurantLangData { get; set; }
    }
    public class ImageData
    {
        public int RestarauntID { get; set; }
        public IEnumerable<HttpPostedFileBase> files { get; set; }
    }
    public class RestaurantList
    {
        public List<Restaraunt> RestarauntList { get; set; }
        public List<RestarauntLang> RestarauntLangList { get; set; }
        public List<Image> ImageList { get; set; }
    }
}