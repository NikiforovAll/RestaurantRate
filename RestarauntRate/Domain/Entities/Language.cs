using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web.Mvc;

namespace Domain.Entities
{
    public class Language
    {
        [Key]
        public int LanguageID { get; set; }
        [StringLength(3)]
        [Index(IsUnique = true)]
        public string Code { get; set; }
        [StringLength(30)]
        [Index(IsUnique = true)]
        public string Name { get; set; }
        public virtual List<RestarauntLang> RestLangs { get; set; }
        public Language()
        {
            this.RestLangs = new List<RestarauntLang>();
        }
    }
}
