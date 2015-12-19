using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Web.Routing;
using Domain.Concrete;
using Domain.Abstract;
using RestRate.Infrastructure.Abstract;
using RestRate.Infrastructure.Concrete;
using Moq;
using Ninject;
using System.Web.Mvc;

namespace RestRate.Infrastructure
{
    public class NinjectControllerFactory : DefaultControllerFactory
    {
        private IKernel ninjectKernel;
        public NinjectControllerFactory()
        {
            // создание контейнера
            ninjectKernel = new StandardKernel();
            AddBindings();
        }
        protected override IController GetControllerInstance(RequestContext requestContext,
        Type controllerType)
        {
            // получение объекта контроллера из контейнера
            // используя его тип
            return controllerType == null
            ? null
            : (IController)ninjectKernel.Get(controllerType);
        }
        private void AddBindings()
        {
            // конфигурирование контейнера
            ninjectKernel.Bind<ICommentRepository>().To<EFCommentRepository>();
            ninjectKernel.Bind<IImageRepository>().To<EFImageRepository>();
            ninjectKernel.Bind<IRestarauntLangRepository>().To<EFRestarauntLangRepository>();
            ninjectKernel.Bind<IRestarauntRepository>().To<EFRestarauntRepository>();
            ninjectKernel.Bind<ILanguageRepository>().To<EFLanguageRepository>();
            ninjectKernel.Bind<IUserRepository>().To<EFUserRepository>();
            ninjectKernel.Bind<IUserEventRepository>().To<EFUserEventRepository>();
            ninjectKernel.Bind<IAuthProvider>().To<FormsAuthProvider>();             // for authentication
            ninjectKernel.Bind<IWorkWithDBProvider>().To<FormsWorkWithDBProvider>(); // for working with DB
        }
    }
}