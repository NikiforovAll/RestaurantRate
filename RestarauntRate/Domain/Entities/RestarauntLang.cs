using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web.Mvc;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class RestarauntLang
    {
        [Key]
        public int RestarauntLangID { get; set; }
        public int RestarauntID { get; set; }
        public int LanguageID { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string Country { get; set; }
        [Required]
        [StringLength(50)]
        public string Region { get; set; }
        [Required]
        [StringLength(50)]
        public string Locality { get; set; }
        [Required]
        [StringLength(50)]
        public string Address { get; set; }
        [StringLength(500)]
        public string Review { get; set; }
        public Restaraunt Restaraunt { get; set; }
        public Language Language { get; set; }
    }
}
