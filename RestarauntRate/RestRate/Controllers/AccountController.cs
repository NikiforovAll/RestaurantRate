using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Domain.Entities;
using Domain.Abstract;
using RestRate.Infrastructure.Abstract;

namespace RestRate.Controllers
{
    public class AccountController : Controller
    {
        IAuthProvider authProvider;
        IUserRepository userRepository;
        public AccountController(IAuthProvider auth, IUserRepository user)
        {
            this.authProvider = auth;
            this.userRepository = user;
        }
        public ViewResult Login()
        {
            return View();
        }
        [HttpGet]
        public ViewResult Register()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Login(User data)
        {
            try
            {
                if (authProvider.Authenticate(data))
                {
                    return Json(new { result = "success" });
                }
                else
                {
                    return Json(new { result = "error", message = "Incorrect login or/and password." });
                }
            }
            catch
            {
                return Json(new { message = "JSON request is NULL."});
            }
        }
        [HttpPost]
        public JsonResult Restore(string email)
        {          
            try
            {
                User user = authProvider.GetUserByEmail(email);
                string body = String.Format("Hello, {0}! Your password is {1}.", user.UserName, user.Password);
                const string subject = "Password restoration.";
                try {
                    authProvider.EmailSender(new System.Net.Mail.MailAddress("restrate.postservice@gmail.com", "Restaurant Rating Team"), "secret0000",
                                            new System.Net.Mail.MailAddress(email), subject, body);
                    return Json(new { result = "success" });
                }
                catch
                {
                    return Json(new { result = "error" });
                }
            }
            catch
            {
                return Json(new { message = "JSON request is NULL." });
            }
        }
        [HttpPost]
        public JsonResult Register(string bla)
        {
            string body = String.Format("Dear {0}, you have recently registered on the Restaurant Rating website and we are glad to inform you that your application has been accepted. To get access to the Admin part of our website, please, use the login \"{1}\" and the password you’ve indicated while registering. Thank you for visiting our website. Yours sincerely, Restaurant Rating Team");
            const string subject = "Account activation.";
            return Json(null);
        }
        [HttpPost]
        public ViewResult Logout()
        {
            return View();
        }
    }
}