using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Domain.Abstract;
using Domain.Concrete;
using RestRate.ModelView;
using Domain.Entities;
using RestRate.Infrastructure.Abstract;

namespace RestRate.Infrastructure.Concrete
{
    public class FormsWorkWithDBProvider : IWorkWithDBProvider
    {
        IImageRepository imageRepository;
        public FormsWorkWithDBProvider(IImageRepository imageRepository)
        {
            this.imageRepository = imageRepository;
        }
        public RestarauntAllData CreateRestarauntAllData(Restaraunt restaraunt, RestarauntLang restLang)
        {
            RestarauntAllData result = new RestarauntAllData();
            result.Address = restLang.Address;
            result.Country = restLang.Country;
            result.Locality = restLang.Locality;
            result.Region = restLang.Region;
            result.Review = restLang.Review;
            result.Name = restLang.Name;
            result.Longitude = restaraunt.Longitude;
            result.Latitude = restaraunt.Latitude;
            result.KitchenRate = restaraunt.KitchenRate;
            result.InteriorRate = restaraunt.InteriorRate;
            result.MaintenanceRate = restaraunt.MaintenanceRate;
            result.RestarauntType = restaraunt.RestarauntType;
            result.Images = imageRepository.GetRestarauntImages(restaraunt.RestarauntID);
            return result;
        }

    }
}