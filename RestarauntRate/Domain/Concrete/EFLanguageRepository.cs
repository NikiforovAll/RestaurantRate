using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain.Entities;
using Domain.Abstract;
using System.Threading.Tasks;

namespace Domain.Concrete
{
    public class EFLanguageRepository : ILanguageRepository
    {
        private EFDbContext context = new EFDbContext();
        public IQueryable<Language> Languages
        {
            get { return context.Languages; }
        }
        public void SaveLanguages(Language languages)
        {
            if (languages.LanguageID == 0)
            {
                context.Languages.Add(languages);
            }
            else
            {
                Language dbEntry = context.Languages.Find(languages.LanguageID);
                if (dbEntry != null)
                {
                    dbEntry.Name = languages.Name;
                    dbEntry.Code = languages.Code;
                }
            }
            context.SaveChanges();
        }
        public Language DeleteLanguages(int languagesID)
        {
            Language dbEntry = context.Languages.Find(languagesID);
            if (dbEntry != null)
            {
                context.Languages.Remove(dbEntry);
                context.SaveChanges();
            }
            return dbEntry;
        }
    }
}
