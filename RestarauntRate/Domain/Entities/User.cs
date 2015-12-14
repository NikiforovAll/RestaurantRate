using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Web.Mvc;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        [Required]
        [StringLength(30)]
        [Index(IsUnique = true)]
        public string UserName { get; set; }
        [Required]
       // [DataType(DataType.Password)]
        [StringLength(30)]
        public string Password { get; set; }
        [Required]
        [EmailAddress]
        [StringLength(30)]
        [Index(IsUnique = true)]
        public string Email { get; set; }
        public DateTime RegisterDate { get; set; }
        public UserRole Role { get; set; }
        public enum UserRole
        {
            Admin,
            Moderator,
            Inactive
        }
        public virtual List<UserEvent> UserEvent { get; set; }
        public User()
        {
            this.UserEvent = new List<UserEvent>();
        }
    }
}
