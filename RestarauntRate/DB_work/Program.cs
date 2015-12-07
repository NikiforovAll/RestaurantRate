using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Concrete;


namespace DB_work
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var db = new EFDbContext())
            {
                var user = new User() { UserName = "proverka", Password = "proverka", Email = "test@gmail.com", Role = User.UserRole.Inactive, RegisterDate = DateTime.Now };
                var user1 = new User() { UserName = "admin", Password = "secret", Email = "ruslan.avsenin@gmail.com", Role = User.UserRole.Admin, RegisterDate = DateTime.Now };
                var user2 = new User() { UserName = "Elena_Tinkovan", Password = "1111", Email = "tioraelena@gmail.com", Role = User.UserRole.Moderator, RegisterDate = DateTime.Now };

                db.Users.Add(user);
                db.Users.Add(user1);
                db.Users.Add(user2);
                //var rest = new Restaraunt() { MaintenanceRate = 1, InteriorRate = 3, KitchenRate = 4, AddedDate = DateTime.Now, RestarauntType = Restaraunt.RestType.Cafe, Latitude = "1", Longitude = "2" };
                //db.Restaraunts.Add(rest);
                //var image = new Image() { ImageMimeType = "123", ImageData = null };
                //var restLangs = new RestarauntLang() { Country = "test", Address = "test", Locality = "test", Name = "test", Region = "test", Review = "test" };
                //var language = new Language() { Name = "russian", Code = "rus" };
                //var comment = new Comment() { Name = "bla bla", RestarauntID = 1, AddedDate = DateTime.Now, Review = "cool" };
                //var comment1 = new Comment() { Name = "gav gav", RestarauntID = 1, AddedDate = DateTime.Now, Review = "nice" };
                //rest.Images.Add(image);
                //rest.RestLangs.Add(restLangs);
                //rest.Comment.Add(comment);
                //rest.Comment.Add(comment1);
                //language.RestLangs.Add(restLangs);
                //db.Restaraunts.Add(rest);
                //db.Languages.Add(language);                           
                try
                {
                    //     EFUserRepository test = new EFUserRepository();

                    // User u = db.Users.Where(usr => usr.UserID == 2).First();
                    //   u.Role = User.UserRole.Moderator;
                    //test.SaveUser(u);
                    // db.SaveChanges();
                    //User usr = db.Users.Where(user => user.Email == "tioraelena@gmail.com").First();
                    //usr.Role = User.UserRole.Moderator;
                 //   Image tmp = db.Images.Where(img => img.ImageID == 12).First();
                   // Image tmp1 = db.Images.Where(img => img.ImageID == 5).First();
                  //  db.Images.Remove(tmp);
                   // db.Images.Remove(tmp1);
                    db.SaveChanges();
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
