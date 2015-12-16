using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Entities;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IImageRepository
    {
        IQueryable<Image> Images { get; }
        void SaveImage(Image image);
        Image DeleteImage(int imageID);
        List<Image> GetRestarauntImages(int restarauntID);
    }
}
