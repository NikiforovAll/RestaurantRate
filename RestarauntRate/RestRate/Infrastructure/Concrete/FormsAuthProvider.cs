using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Domain.Concrete;
using System.Web.Security;
using RestRate.Infrastructure.Abstract;
using Domain.Entities;
using System.Net.Mail;
using System.Web.Mvc;
using System.Web;
using System.Net;

namespace RestRate.Infrastructure.Concrete
{
    public class FormsAuthProvider : IAuthProvider
    {
        public bool Authenticate(User user)
        {
            if(UserWasFound(user))
            {
                FormsAuthentication.SetAuthCookie(user.UserName, false);
                return true;
            }
            return false;
        }
        public bool UserWasFound(User user)
        {
            User u = user;
            using (var context = new EFDbContext())
            {
                try
                {
                    User dbEntry = context.Users.Where(usr => usr.UserName == user.UserName &&
                                   usr.Password == user.Password && ((usr.Role == User.UserRole.Admin) || usr.Role == User.UserRole.Moderator)).First();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }
        public void EmailSender(MailAddress fromAddress, string fromPassword, MailAddress toAddress, string subject, string body)
        {
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
        }
        public User GetUserByEmail(string email)
        {
            using (var context = new EFDbContext())
            {
                return (context.Users.Where(user => user.Email == email).First());
            }
        }
    }
}