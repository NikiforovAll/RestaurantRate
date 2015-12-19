using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain.Entities;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IRestarauntLangRepository
    {
        IQueryable<RestarauntLang> RestarauntLangs { get; }
        void SaveRestarauntLang(RestarauntLang restarauntLang);
        RestarauntLang DeleteRestarauntLang(int restarauntLangID);
        List<RestarauntLang> GetAll(int languageID);
        List<RestarauntLang> GetAllWithinRadius(int[] restarauntID, int languageID);
        RestarauntLang GetRestarauntLangByID(int restarauntID);
    }
}
