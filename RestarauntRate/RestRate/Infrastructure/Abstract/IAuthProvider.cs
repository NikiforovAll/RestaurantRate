using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using System.Net.Mail;
using System.Net;

namespace RestRate.Infrastructure.Abstract
{
    public interface IAuthProvider
    {
        bool Authenticate(User user);
        void EmailSender(MailAddress fromAddress, string fromPassword, MailAddress toAddress, string subject, string body);
        User GetUserByEmail(string email);
    }
}
