using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Domain.Entities;

namespace RestRate.ModelView
{
    public class RestaurantData
    {
        public Restaraunt RestarauntData { get; set; }
        public RestarauntLang RestaurantLangData { get; set; }
    }
    public class RestaurantList
    {
        public List<Restaraunt> RestarauntList { get; set; }
        public List<RestarauntLang> RestarauntLangList { get; set; }
        public List<Image> ImageList { get; set; }
    }
}