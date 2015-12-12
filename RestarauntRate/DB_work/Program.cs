using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Concrete;
using System.Drawing;

namespace DB_work
{
    class Program
    {
        public static void SaveImageAsJPG(System.Drawing.Image image, string path)
        {
            image = System.Drawing.Image.FromFile(path);

            image.Save(path, System.Drawing.Imaging.ImageFormat.Jpeg);
        }
        static void Main(string[] args)
        {
            using (var db = new EFDbContext())
            {
                //   var user = new User() { UserName = "proverka", Password = "proverka", Email = "test@gmail.com", Role = User.UserRole.Inactive, RegisterDate = DateTime.Now };
                // var user1 = new User() { UserName = "admin", Password = "secret", Email = "ruslan.avsenin@gmail.com", Role = User.UserRole.Admin, RegisterDate = DateTime.Now };
                //var user2 = new User() { UserName = "Elena_Tinkovan", Password = "1111", Email = "tioraelena@gmail.com", Role = User.UserRole.Moderator, RegisterDate = DateTime.Now };
               

                //db.Users.Add(user);
                //db.Users.Add(user1);
                //db.Users.Add(user2);
               // var rest = new Restaraunt() { MaintenanceRate = 1, InteriorRate = 3, KitchenRate = 4, AddedDate = DateTime.Now, RestarauntType = Restaraunt.RestType.Cafe, Latitude = "1", Longitude = "2" };
               // db.Restaraunts.Add(rest);
                //var image = new Image() { ImageMimeType = "123", ImageData = null };
               // var restLangs = new RestarauntLang() { Country = "rusTest", Address = "rusTest", Locality = "rusTest", Name = "rusTest", Region = "rusTest", Review = "rusTest" };
                //restLangs.LanguageID = 6;
                //rest.RestLangs.Add(restLangs);
                //db.Restaraunts.Add(rest);
            //    var restLangs1 = new RestarauntLang() { Country = "engTest", Address = "engTest", Locality = "engTest", Name = "engTest", Region = "engTest", Review = "engTest" };
             //   var language = new Language() { Name = "russian", Code = "rus" };
           //     var language1 = new Language() { Name = "english", Code = "eng" };
                //var comment = new Comment() { Name = "bla bla", RestarauntID = 1, AddedDate = DateTime.Now, Review = "cool" };
                //var comment1 = new Comment() { Name = "gav gav", RestarauntID = 1, AddedDate = DateTime.Now, Review = "nice" };
              /*  rest.RestLangs.Add(restLangs);
                rest.RestLangs.Add(restLangs1);
                language.RestLangs.Add(restLangs);
                language1.RestLangs.Add(restLangs1);
                db.Restaraunts.Add(rest);
                db.Languages.Add(language);
                db.Languages.Add(language1);  */
                
                                      
                try
                {
                    //     EFUserRepository test = new EFUserRepository();
                     var lol = db.Restaraunts.Where(rest => rest.RestarauntID == 18).First();
                    var lol2 = db.Restaraunts.Where(rest => rest.RestarauntID == 19).First();
                    var lol1 = db.Restaraunts.Where(rest => rest.RestarauntID == 20).First();
                    db.Restaraunts.Remove(lol);
                    db.Restaraunts.Remove(lol1);
                    db.Restaraunts.Remove(lol2);
                    //  var lang = db.Languages.Where(l => l.LanguageID == 1).First();
                    // db.Languages.Remove(lang);
                    // User u = db.Users.Where(usr => usr.UserID == 7).First();
                    // u.Role = User.UserRole.Moderator;
                    //test.SaveUser(u);
                    db.SaveChanges();
                    //User usr = db.Users.Where(user => user.Email == "tioraelena@gmail.com").First();
                    //usr.Role = User.UserRole.Moderator;
                   // foreach(Image img in db.Images)
                  /*  {
                        db.Images.Remove(img);
                    }*/
                    // Console.WriteLine(DateTime.Now.ToFileTime());
                   /* var files = System.IO.Directory.GetFiles(@"E:\Ruslan\Web\Projects\RestRate\RestarauntRate\DB_work\start");
                    int count = 0;
                    foreach (var file in files)
                    {
                        Bitmap tempBmp = new Bitmap(file);
                        Bitmap bmp = new Bitmap(tempBmp, 807, 605);

                        bmp.Save(
                        @"E:\Ruslan\Web\Projects\RestRate\RestarauntRate\DB_work\res\" + count + ".jpg",
                        System.Drawing.Imaging.ImageFormat.Jpeg);
                        count++;

                    }                  */
                    //Image tmp = db.Images.Where(img => img.ImageID == 5).First();
                    //Image tmp1 = db.Images.Where(img => img.ImageID == 6).First();
                    // db.SaveChanges();
                    //   User user = context.Users.Where(usr => usr.Email == "ruslan.avsenin@gmail.com").First();
                    // Console.WriteLine(user.UserName + " " + user.Password + " " + user.Role);

                    // User user = context.Users.Find(1);
                    // user.Role = User.UserRole.Moderator;
                    //context.SaveChanges();
                    //   User dbEntry = db.Users.Where(usr => usr.UserName == "admin").First();
                    // Console.WriteLine(dbEntry.UserName + dbEntry.Password + dbEntry.Role);
                    // foreach(User usr in db.Users)
                    //{
                    //    Console.WriteLine(usr.UserName + usr.Password + usr.Role);
                    //}
                    //foreach (var u in db.Users)
                    // {
                    // Console.WriteLine("Name: {0} Password: {1} Email: {2} Role: {3}", u.UserName, u.Password, u.Email, u.Role);
                    //}                   
                }
                catch
                {
                    Console.WriteLine("SHIIIT");
                }
            }
        }
    }
}
