using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Domain.Entities;

namespace RestRate.ModelView
{
    /// <summary>
    /// Сделать code review на тему повторений полей предыдущих моделей при создании новых
    /// </summary>
    public class RestaurantData
    {
        public Restaraunt RestarauntData { get; set; }
        public RestarauntLang RestaurantLangData { get; set; }
    }
    public class RestIDNameFullAddress
    {
        public int RestarauntID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Locality { get; set; }
        public string Region { get; set; }
        public string Country { get; set; }
    }
    public class RestIDNameFullAddressRates
    {
        public RestIDNameFullAddress RestaurantIDNameFullAddress { get; set; }
        public float KitchenRate { get; set; }
        public float InteriorRate { get; set; }
        public float MaintenanceRate { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
    }
    public class RestarauntAllData
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string Region { get; set; }
        public string Locality { get; set; }
        public double KitchenRate { get; set; }
        public double MaintenanceRate { get; set; }
        public double InteriorRate { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public Restaraunt.RestType RestarauntType { get; set; }
        public DateTime AddedDate { get; set; }
        public string Review { get; set; }
        public List<Image> Images { get; set; }
    }
    public class GeoCoordinates
    {
        public string Longitude { get; set; }
        public string Latitude { get; set; }
    }
}