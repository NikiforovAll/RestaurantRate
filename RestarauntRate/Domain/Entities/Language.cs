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
        [HiddenInput(DisplayValue = false)]
        public int LanguageID { get; set; }
        [HiddenInput(DisplayValue = false)]
        [StringLength(3)]
        public string Code { get; set; }
        [StringLength(30)]
        public string Name { get; set; }
        public virtual List<RestarauntLang> RestLangs { get; set; }
        public Language()
        {
            this.RestLangs = new List<RestarauntLang>();
        }
    }
}
