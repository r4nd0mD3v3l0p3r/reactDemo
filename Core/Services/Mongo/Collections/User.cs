using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.Core.Services.Mongo.Collections
{
    public class User
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }
}
