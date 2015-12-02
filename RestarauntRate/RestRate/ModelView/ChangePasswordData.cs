using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Domain.Entities;

namespace RestRate.ModelView
{
    public class ChangePasswordData
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}