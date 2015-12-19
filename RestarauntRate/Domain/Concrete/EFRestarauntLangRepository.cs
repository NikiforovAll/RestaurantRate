using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain.Entities;
using Domain.Abstract;
using System.Threading.Tasks;

namespace Domain.Concrete
{
    public class EFRestarauntLangRepository : IRestarauntLangRepository
    {
        private EFDbContext context = new EFDbContext();
        public IQueryable<RestarauntLang> RestarauntLangs
        {
            get { return context.RestarauntLangs; }
        }
        public void SaveRestarauntLang(RestarauntLang restarauntLang)
        {
            if (restarauntLang.RestarauntLangID == 0)
            {
                context.RestarauntLangs.Add(restarauntLang);
            }
            else
            {
                RestarauntLang dbEntry = context.RestarauntLangs.Find(restarauntLang.RestarauntLangID);
                if (dbEntry != null)
                {
                    dbEntry.Name = restarauntLang.Name;
                    dbEntry.Region = restarauntLang.Region;
                    dbEntry.Locality = restarauntLang.Locality;
                    dbEntry.Country = restarauntLang.Country;
                    dbEntry.Address = restarauntLang.Address;
                    dbEntry.Review = restarauntLang.Review;
                    dbEntry.RestarauntID = restarauntLang.RestarauntID;
                    dbEntry.LanguageID = restarauntLang.LanguageID;
                }
            }
            context.SaveChanges();
        }
        public RestarauntLang DeleteRestarauntLang(int restarauntLangID)
        {
            RestarauntLang dbEntry = context.RestarauntLangs.Find(restarauntLangID);
            if (dbEntry != null)
            {
                context.RestarauntLangs.Remove(dbEntry);
                context.SaveChanges();
            }
            return dbEntry;
        }
        public List<RestarauntLang> GetAll(int languageID) // Обратить внимание, что для работы с languageID пришлось включить MARS в connectionString
        {
            List<RestarauntLang> result = new List<RestarauntLang>();
            foreach(var rl in context.RestarauntLangs)
            {
                if (rl.LanguageID == languageID)
                {
                    result.Add(rl);
                }
            }
            return result;
        }
        public RestarauntLang GetRestarauntLangByID(int restarauntID) 
        {
            return context.RestarauntLangs.Where(restLang => restLang.RestarauntID == restarauntID).First();
        }
        public List<RestarauntLang> GetAllWithinRadius(int[] restarauntID, int languageID)// подумать над тем как можно оптимизировать
        {
            List<RestarauntLang> result = new List<RestarauntLang>();
            foreach (var rl in context.RestarauntLangs)
            {
                for (int i = 0; i < restarauntID.Length; i++)
                {
                    if ((rl.RestarauntID == restarauntID[i]) && (rl.LanguageID == languageID))
                    {
                        result.Add(rl);
                    }
                }
            }
            return result;
        }
    }
}
