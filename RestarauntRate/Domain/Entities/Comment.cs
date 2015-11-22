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
    public class Comment
    {
        [Key]
        [HiddenInput(DisplayValue = false)]
        public int CommentID { get; set; }
        [HiddenInput(DisplayValue = false)]
        public int RestarauntID { get; set; }
        [Required]
        [StringLength(20)]
        //   [RegularExpression("^[а-яА-ЯёЁa-zA-Z][а-яА-ЯёЁa-zA-Z0-9]+$", ErrorMessage = "Invalid name.")]
        public string Name { get; set; }
        public DateTime AddedDate { get; set; }
        [Required]
        [StringLength(150)]
        [DataType(DataType.MultilineText)]
        public string Review { get; set; }
        public Restaraunt Restaraunt { get; set; }
    }
}
