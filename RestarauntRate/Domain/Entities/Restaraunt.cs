using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Text;
using System.Threading.Tasks;
using System.Device.Location;

namespace Domain.Entities
{

    public class Restaraunt
    {
        [Key]
        public int RestarauntID { get; set; }
        [Required]
        public RestType RestarauntType { get; set; }
        [Required]
        [RegularExpression("[0-5]", ErrorMessage = "Invalid rate value.")]
        public int KitchenRate { get; set; }
        [Required]
        [RegularExpression("[0-5]", ErrorMessage = "Invalid rate value.")]
        public int MaintenanceRate { get; set; }
        [Required]
        [RegularExpression("[0-5]", ErrorMessage = "Invalid rate value.")]
        public int InteriorRate { get; set; }
        public DateTime AddedDate { get; set; }
        [Required]
        public string Longitude { get; set; }
        [Required]
        public string Latitude { get; set; }
        public virtual List<RestarauntLang> RestLangs { get; set; }
        public virtual List<Image> Images { get; set; }
        public virtual List<Comment> Comment { get; set; }
        public Restaraunt()
        {
            this.Comment = new List<Comment>();
            this.Images = new List<Image>();
            this.RestLangs = new List<RestarauntLang>();
        }
        public enum RestType
        {
            Cafe,
            Bar,
            Restaraunt
        }
    }
}
