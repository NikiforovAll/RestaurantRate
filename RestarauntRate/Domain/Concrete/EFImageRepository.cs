using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Abstract;
using Domain.Entities;

namespace Domain.Concrete
{
    public class EFImageRepository: IImageRepository
    {
        private EFDbContext context = new EFDbContext();
        public IQueryable<Image> Images
        {
            get { return context.Images; }
        }
        public void SaveImage(Image image)
        {
            if (image.ImageID == 0)
            {
                context.Images.Add(image);
            }
            else
            {
                Image dbEntry = context.Images.Find(image.ImageID);
                if (dbEntry != null)
                {
                    dbEntry.Url = image.Url;
                    dbEntry.RestarauntID = image.RestarauntID;
                }
            }
            context.SaveChanges();
        }
        public Image DeleteImage(int imageID)
        {
            Image dbEntry = context.Images.Find(imageID);
            if (dbEntry != null)
            {
                context.Images.Remove(dbEntry);
                context.SaveChanges();
            }
            return dbEntry;
        }
        public List<Image> GetRestarauntImages(int restarauntID)
        {
            List<Image> result = new List<Image>();
            foreach(var image in context.Images)
            {
                if(image.RestarauntID == restarauntID)
                {
                    result.Add(image);
                }
            }
            return result;
        }
    }
}
