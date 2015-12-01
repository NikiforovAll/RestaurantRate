using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using Domain.Entities;
using System.Threading.Tasks;

namespace Domain.Concrete
{
    public class EFDbContext : DbContext
    {
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Restaraunt> Restaraunts { get; set; }
        public DbSet<RestarauntLang> RestarauntLangs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserEvent> UserEvents { get; set; }
    }
}
