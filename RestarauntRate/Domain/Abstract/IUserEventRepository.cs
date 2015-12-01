using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Abstract
{
    public interface IUserEventRepository
    {
        IQueryable<UserEvent> UserEvents { get; }
        void SaveUserEvent(UserEvent userEvent);
        UserEvent DeleteUserEvent(int UserEventID);
    }
}
