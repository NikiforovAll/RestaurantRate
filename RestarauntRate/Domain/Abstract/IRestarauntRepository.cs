using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Abstract
{
    public interface IRestarauntRepository
    {
        IQueryable<Restaraunt> Restaraunts { get; }
        void SaveRestaraunt(Restaraunt restaraunt/*, RestarauntLang restLang = null, Image image = null, Comment comment = null*/);
        Restaraunt DeleteRestaraunt(int restarauntID);
        Restaraunt GetRestarauntByID(int restarauntID);
    }
}
