using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestRate.ModelView;
using Domain.Entities;

namespace RestRate.Infrastructure.Abstract
{
    public interface IWorkWithDBProvider
    {
        RestarauntAllData CreateRestarauntAllData(Restaraunt restaraunt, RestarauntLang restLang);
    }
}
