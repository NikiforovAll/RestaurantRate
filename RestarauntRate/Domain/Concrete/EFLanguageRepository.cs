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
    }
}
