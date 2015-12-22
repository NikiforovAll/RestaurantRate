using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Concrete;
using System.Web.Mvc;
using System.Drawing;

namespace DB_work
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var db = new EFDbContext())
            //{
            //     var user = new User() { UserName = "proverka", Password = "proverka", Email = "ruslan.avsenin@gmail.com", Role = User.UserRole.Inactive, RegisterDate = DateTime.Now };
            //     var user1 = new User() { UserName = "admin", Password = "secret", Email = "test@gmail.com", Role = User.UserRole.Admin, RegisterDate = DateTime.Now };
            //     var user2 = new User() { UserName = "Elena_Tinkovan", Password = "1111", Email = "tioraelena@gmail.com", Role = User.UserRole.Moderator, RegisterDate = DateTime.Now };


            //    db.Users.Add(user);
            //    db.Users.Add(user1);
            //    db.Users.Add(user2);
                //var rest = new Restaraunt() { MaintenanceRate = 1, InteriorRate = 3, KitchenRate = 4, AddedDate = DateTime.Now, RestarauntType = Restaraunt.RestType.Cafe, Latitude = "1", Longitude = "2" };
                 //db.Restaraunts.Add(rest);
                //var image = new Image() { ImageMimeType = "123", ImageData = null };
                //var restLangs = new RestarauntLang() { Country = "rusTest0", Address = "rusTest0", Locality = "rusTest0", Name = "rusTest0", Region = "rusTest0", Review = "rusTest0" };
                //Language Test = db.Languages.Where(t => t.LanguageID == 1).First();
                //restLangs.LanguageID = Test.LanguageID;
                //restLangs.LanguageID = 6;
                //rest.RestLangs.Add(restLangs);
                //db.Restaraunts.Add(rest);
                //    var restLangs1 = new RestarauntLang() { Country = "engTest", Address = "engTest", Locality = "engTest", Name = "engTest", Region = "engTest", Review = "engTest" };
                //var language = new Language() { Name = "russian", Code = "rus" };
                //var language1 = new Language() { Name = "english", Code = "eng" };
                //var comment = new Comment() { Name = "bla bla", RestarauntID = 1, AddedDate = DateTime.Now, Review = "cool" };
                //var comment1 = new Comment() { Name = "gav gav", RestarauntID = 1, AddedDate = DateTime.Now, Review = "nice" };
                //  rest.RestLangs.Add(restLangs);
                // rest.RestLangs.Add(restLangs1);
                // language.RestLangs.Add(restLangs);
                //language1.RestLangs.Add(restLangs1);
               // db.Restaraunts.Add(rest);
                //db.Languages.Add(language);
                //db.Languages.Add(language1);  


                try
                {
                    //var rl1 = db.RestarauntLangs.Where(rest => rest.Name == "Dolce la torre").First();
                    //var r1 = db.Restaraunts.Where(rest => rest.RestarauntID == rl1.RestarauntID).First();
                    //var img = 
                    //foreach(var rest in db.Restaraunts)
                    //{
                    //    if ((rest.RestarauntID != 27) && (rest.RestarauntID != 33) && (rest.RestarauntID != 34)) 
                    //    {
                    //        db.Restaraunts.Remove(rest);
                    //    }
                    //}

                    //     EFUserRepository test = new EFUserRepository();
                    //  var lol = db.Restaraunts.Where(rest => rest.RestarauntID == 2).First();
                    // var lol2 = db.Restaraunts.Where(rest => rest.RestarauntID == 1).First();
                    //   var lol1 = db.Restaraunts.Where(rest => rest.RestarauntID == 20).First();
                    //db.Restaraunts.Remove(lol);
                    // db.Restaraunts.Remove(lol1);
                    //db.Restaraunts.Remove(lol2);

                    //  var lang = db.Languages.Where(l => l.LanguageID == 1).First();
                    // db.Languages.Remove(lang);
                    //  User u = db.Users.Where(usr => usr.UserID == 4).First();
                    //u.Role = User.UserRole.Moderator;
                    //test.SaveUser(u);
                    //foreach (var obj in db.Restaraunts)
                    //{
                    //    db.Restaraunts.Remove(obj);
                    //}
                    //foreach (var obj in db.Images)
                    //{
                    //    db.Images.Remove(obj);
                    //}
                    //foreach (var obj in db.RestarauntLangs)
                    //{
                    //    db.RestarauntLangs.Remove(obj);
                    //}
                    // db.SaveChanges();
                    //User usr = db.Users.Where(user => user.Email == "tioraelena@gmail.com").First();
                    //usr.Role = User.UserRole.Moderator;
                    // foreach(Image img in db.Images)
                    /*  {
                          db.Images.Remove(img);
                      }*/
                    // Console.WriteLine(DateTime.Now.ToFileTime());               
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

