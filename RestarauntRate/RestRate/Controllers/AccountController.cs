using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Domain.Entities;
using Domain.Abstract;
using System.Web.Security;
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
        public ActionResult Login(User data, bool persistCookie = false)
        {
            try
            {
                if ((authProvider.Authenticate(data)))
                {
                    FormsAuthenticationTicket ticket = new FormsAuthenticationTicket
                    (
                    1,
                    data.UserName,
                    DateTime.Now,
                    DateTime.Now.AddMinutes(30),
                    false,
                    FormsAuthentication.FormsCookiePath
                    );
                    Response.Cookies.Add
                    (
                        new HttpCookie
                        (
                            FormsAuthentication.FormsCookieName,
                            FormsAuthentication.Encrypt(ticket)
                        )
                    );
                    Response.Cookies.Add(new HttpCookie("username", data.UserName));
                    var cookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                    var ticketInfo = FormsAuthentication.Decrypt(cookie.Value);
                    return Json(new { result = "success" });
                }
                else
                {
                    return Json(new { result = "error", message = "Incorrect login or/and password." });
                }
            }
            catch
            {
                return Json(new { result = "error", message = "Unknown error!\nPlease, try again later." });
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
                try
                {
                    authProvider.EmailSender(new System.Net.Mail.MailAddress("restrate.postservice@gmail.com", "Restaurant Rating Team"), "secret0000",
                                            new System.Net.Mail.MailAddress(email), subject, body);
                    return Json(new { result = "success", message = "Restore E-mail was sended successful!" });
                }
                catch
                {
                    return Json(new { result = "error", message = "Error occured while sending e-mail\nPlease, try again later." });
                }
            }
            catch
            {
                return Json(new { result = "error", message = "User with this E-mail doesn't exist!\nWe cannot restore password unregistered user." });
            }
        }
        [HttpPost]
        public JsonResult Register(User user)
        {
            try // TODO: RETURN ERROR MESSAGE WHEN USER IS ALREADY EXIST
            {
                if (user != null)
                {
                     try 
                    {
                        user.RegisterDate = DateTime.Now;
                        userRepository.SaveUser(user);
                        return Json(new { result = "success", message = "Thank you for registering! Your request is in processing.\nYou'll be informed about the activation of your account by an e-mail" });
                    }
                    catch
                    {
                        return Json(new { result = "error", message = "A user with such Email address/Username already exists. Please, enter another one." });
                    }
                }
                else
                {
                    return Json(new { result = "error", message = "Registration error!\nPlease, try again later." });
                }
            }
            catch
            {
                return Json(new { result = "error", message = "Registration error! Maybe, DB is down.\nPlease, try register later." });
            }
        }
        //string body = String.Format("Dear {0}, you have recently registered on the Restaurant Rating website and we are glad to inform you that your application has been accepted. To get access to the Admin part of our website, please, use the login \"{1}\" and the password you’ve indicated while registering. Thank you for visiting our website. Yours sincerely, Restaurant Rating Team");
        //const string subject = "Account activation.";
    }
}