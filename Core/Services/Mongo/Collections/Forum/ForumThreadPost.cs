using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.Core.Services.Mongo.Collections.Forum
{
    public class ForumThreadPost
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string ThreadId { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public string Text { get; set; }
        public string Author { get; set; }
    }
}
