using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Entities;
using Domain.Abstract;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Concrete
{
    public class EFRestarauntRepository : IRestarauntRepository
    {
        private EFDbContext context = new EFDbContext();
        public IQueryable<Restaraunt> Restaraunts
        {
            get { return context.Restaraunts; }
        }
        public void SaveRestaraunt(Restaraunt restaraunt)
        {
            if (restaraunt.RestarauntID == 0)
            {
                context.Restaraunts.Add(restaraunt);
            }
            else
            {
                Restaraunt dbEntry = context.Restaraunts.Find(restaraunt.RestarauntID);
                if (dbEntry != null)
                {
                    dbEntry.InteriorRate = restaraunt.InteriorRate;
                    dbEntry.KitchenRate = restaraunt.KitchenRate;
                    dbEntry.MaintenanceRate = restaraunt.MaintenanceRate;
                    dbEntry.RestarauntType = restaraunt.RestarauntType;
                    dbEntry.Longitude = restaraunt.Longitude;
                    dbEntry.Latitude = restaraunt.Latitude;
                }
            }
            context.SaveChanges();
        }
        public void DeleteRestaraunt(int restarauntID)
        {
            Restaraunt dbEntry = context.Restaraunts.Find(restarauntID);
            RestarauntLang dbEntryRestarauntLangs = context.RestarauntLangs.Find(restarauntID);
            Image dbEntryImages = context.Images.Find(restarauntID);
            Comment dbEntryComments = context.Comments.Find(restarauntID);
            if (dbEntry != null)
            {
                context.Restaraunts.Remove(dbEntry);

            }
            if(dbEntryRestarauntLangs != null)
            {
                context.RestarauntLangs.Remove(dbEntryRestarauntLangs);
            }
            if(dbEntryImages != null)
            {
                context.Images.Remove(dbEntryImages);
            }
            if(dbEntryComments != null)
            {
                context.Comments.Remove(dbEntryComments);
            }
            context.SaveChanges();
        }
        public Restaraunt GetRestarauntByID(int restarauntID)
        {
            return context.Restaraunts.Where(rest => rest.RestarauntID == restarauntID).First();
        }
        public List<Restaraunt> GetAll()
        {
            List<Restaraunt> result = new List<Restaraunt>();
            foreach (var rest in context.Restaraunts)
            {
                result.Add(rest);
            }
            return result;
        }
        public List<Restaraunt> GetAllWithinRadius(double latitude, double longtitude, double radius)
        {
            List<Restaraunt> result = new List<Restaraunt>();
            foreach (var rest in context.Restaraunts)
            {
                if ((Math.Pow((Convert.ToDouble(rest.Longitude) - Convert.ToDouble(longtitude)), 2) +
                   Math.Pow((Convert.ToDouble(rest.Latitude) - Convert.ToDouble(latitude)), 2)) <= Math.Pow(radius, 2))
                {
                    result.Add(rest);
                }
            }
            return result;
        }
    }
}
