using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class UserEvent
    {
        [Key]
        public int UserEventID { get; set; }
        public int UserID { get; set; }
        public DateTime UserEventDate { get; set; }
        [StringLength(50)]
        public string UserEventDescription { get; set; }
        public User User { get; set; }
    }
}
