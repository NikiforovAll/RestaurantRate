using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Abstract;
using Domain.Entities;

namespace Domain.Concrete
{
    public class EFUserRepository : IUserRepository
    {
        private EFDbContext context = new EFDbContext();
        public IQueryable<User> Users
        {
            get { return context.Users; }      
        }
        public void SaveUser(User user)
        {
            if (user.UserID == 0)
            {
                user.Role = User.UserRole.Inactive;
                context.Users.Add(user);
            }
            else
            {
                User dbEntry = context.Users.Find(user.UserID);
                if (dbEntry != null)
                {
                    dbEntry.UserName = user.UserName;
                    dbEntry.Password = user.Password;
                    dbEntry.Email = user.Email;
                    dbEntry.Role = user.Role;
                }
            }
            context.SaveChanges();
        }
        public User DeleteUser(int userID)
        {
            User dbEntry = context.Users.Find(userID);
            if (dbEntry != null)
            {
                context.Users.Remove(dbEntry);
                context.SaveChanges();
            }
            return dbEntry;
        }
        public User BlockUser(int userID)
        {
            User dbEntry = context.Users.Find(userID);
            if (dbEntry != null)
            {
                dbEntry.Role = User.UserRole.Inactive;
            }
            return dbEntry;
        }
    }
}
