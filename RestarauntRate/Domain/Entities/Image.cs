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
        [HiddenInput(DisplayValue = false)]
        public int ImageID { get; set; }
        [HiddenInput(DisplayValue = false)]
        public int RestarauntID { get; set; }
        [StringLength(int.MaxValue)]
        public byte[] ImageData { get; set; }
        [HiddenInput(DisplayValue = false)]
        [StringLength(50)]
        public string ImageMimeType { get; set; }
        public Restaraunt Restaraunt { get; set; }
    }
}
