using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Web.Mvc;

namespace Domain.Entities
{
    public class Image
    {
        [Key]
        public int ImageID { get; set; }
        public int RestarauntID { get; set; }
        [Column(TypeName = "varchar(MAX)")]
        public string Url { get; set; }
        public Restaraunt Restaraunt { get; set; }
    }
}
