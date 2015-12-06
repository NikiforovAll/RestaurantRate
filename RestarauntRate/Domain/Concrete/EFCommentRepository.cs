using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain.Entities;
using Domain.Abstract;
using System.Threading.Tasks;

namespace Domain.Concrete
{
    public class EFCommentRepository : ICommentRepository
    {
        private EFDbContext context = new EFDbContext();
        public IQueryable<Comment> Comments
        {
            get { return context.Comments; }
        }
        public void SaveComment(Comment comment)
        {
            if (comment.CommentID == 0)
            {
                context.Comments.Add(comment);
            }
            else
            {
                Comment dbEntry = context.Comments.Find(comment.CommentID);
                if (dbEntry != null)
                {
                    dbEntry.Name = comment.Name;
                    dbEntry.AddedDate = DateTime.Now;
                    dbEntry.Review = comment.Review;
                    dbEntry.RestarauntID = comment.RestarauntID;
                }
            }
            context.SaveChanges();
        }
        public Comment DeleteComment(int commentID)
        {
            Comment dbEntry = context.Comments.Find(commentID);
            if (dbEntry != null)
            {
                context.Comments.Remove(dbEntry);
                context.SaveChanges();
            }
            return dbEntry;
        }
    }
}
