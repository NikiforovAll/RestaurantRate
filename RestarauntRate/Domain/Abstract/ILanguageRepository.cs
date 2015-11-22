using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Entities;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface ILanguageRepository
    {
        IQueryable<Language> Languages { get; }
    }
}
