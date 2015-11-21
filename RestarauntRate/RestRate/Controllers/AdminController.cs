using System;
using System.Collections.Generic;
using Domain.Entities;
using Domain.Abstract;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RestRate.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        private IRestarauntRepository restRepository;
        private ICommentRepository commentRepository;
        private IImageRepository imageRepository;
        private IRestarauntLangRepository restLangRepository;
        public AdminController(IRestarauntRepository restRepository, IRestarauntLangRepository restLangRepository,
                                ICommentRepository commentRepository, IImageRepository imageRepository)
        {
            this.restRepository = restRepository;
            this.restLangRepository = restLangRepository;
            this.commentRepository = commentRepository;
            this.imageRepository = imageRepository;
        }
        // GET: Admin
        public ViewResult Index()
        {
            return View();
        }       
        public ViewResult Logout()
        {
            return View("~/Views/Account/Login.cshtml");
        }
    }
}