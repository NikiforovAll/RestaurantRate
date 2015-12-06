using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Abstract;
using Domain.Entities;

namespace Domain.Concrete
{
    public class EFUserEventRepository: IUserEventRepository
    {
        private EFDbContext context = new EFDbContext();
        public IQueryable<UserEvent> UserEvents
        {
            get { return context.UserEvents; }
        }
        public void SaveUserEvent(UserEvent userEvent)
        {
            if (userEvent.UserEventID == 0)
            {
                context.UserEvents.Add(userEvent);
            }
            else
            {
                UserEvent dbEntry = context.UserEvents.Find(userEvent.UserEventID);
                if (dbEntry != null)
                {
                    dbEntry.UserEventDate = userEvent.UserEventDate;
                    dbEntry.UserEventDescription = userEvent.UserEventDescription;
                    dbEntry.UserID = userEvent.UserID;        
                }
            }
            context.SaveChanges();
        }
        public UserEvent DeleteUserEvent(int userEventID)
        {
            UserEvent dbEntry = context.UserEvents.Find(userEventID);
            if (dbEntry != null)
            {
                context.UserEvents.Remove(dbEntry);
                context.SaveChanges();
            }
            return dbEntry;
        }
    }
}
