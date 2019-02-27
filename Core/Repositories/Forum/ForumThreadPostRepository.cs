using MongoDB.Driver;
using reactDemo.Core.Services.Mongo;
using reactDemo.Core.Services.Mongo.Collections;
using reactDemo.Core.Services.Mongo.Collections.Forum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.Core.Repositories.Forum
{
    public class ForumThreadPostRepository : IForumThreadPostRepository
    {
        readonly IDBInitializer dbInitializer;

        public ForumThreadPostRepository(IDBInitializer dbInitializer)
        {
            this.dbInitializer = dbInitializer;
        }

        public async Task<IAsyncCursor<ForumThreadPost>> PostsOrderedByDateAsync(string threadId)
        {
            var options = new FindOptions<ForumThreadPost> { Sort = Builders<ForumThreadPost>.Sort.Ascending(x => x.CreationDate) };

            return await GetCollection().FindAsync(x => x.ThreadId == threadId, options);
        }

        IMongoCollection<ForumThreadPost> GetCollection()
        {
            return dbInitializer.GetDatabase().GetCollection<ForumThreadPost>(DBInitializer.ForumThreadPost);
        }
    }
}
