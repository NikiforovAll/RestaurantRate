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
                var user = new User() { UserName = "testname", Password = "testpass", Email = "7245932@gmail.com", Role = User.UserRole.Inactive };
                var user1 = new User() { UserName = "admin", Password = "secret", Email = "ruslan.avsenin@gmail.com", Role = User.UserRole.Admin };
                db.Users.Add(user);
                db.Users.Add(user1);
                //var rest = new Restaraunt() { MaintenanceRate = 30, InteriorRate = 30, KitchenRate = 40, AddedDate = DateTime.Now, RestarauntType = Restaraunt.RestType.Cafe };
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
