﻿using System;
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
        public void SaveRestaraunt(Restaraunt restaraunt/*, RestarauntLang restLang = null, Image image = null, Comment comment = null*/)
        {
            if (restaraunt.RestarauntID == 0)
            {
             //   restaraunt.RestLangs.Add(restLang);
               // restaraunt.Images.Add(image);
                //restaraunt.Comment.Add(comment);
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
        public Restaraunt DeleteRestaraunt(int restarauntID)
        {
            Restaraunt dbEntry = context.Restaraunts.Find(restarauntID);
            RestarauntLang dbEntryRestarauntLangs = context.RestarauntLangs.Find(restarauntID);
            Image dbEntryImages = context.Images.Find(restarauntID);
            Comment dbEntryComments = context.Comments.Find(restarauntID);
            if (dbEntry != null)
            {
                context.Restaraunts.Remove(dbEntry);
                context.RestarauntLangs.Remove(dbEntryRestarauntLangs);
                context.Images.Remove(dbEntryImages);
                context.Comments.Remove(dbEntryComments);
                context.SaveChanges();
            }
            return dbEntry;
        }
    }
}
