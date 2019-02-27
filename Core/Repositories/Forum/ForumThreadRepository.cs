using MongoDB.Driver;
using reactDemo.Core.Services.Mongo;
using reactDemo.Core.Services.Mongo.Collections;
using System;
using System.Threading.Tasks;

namespace reactDemo.Core.Repositories
{
    public class ForumThreadRepository : IForumThreadRepository
    {
        readonly IDBInitializer dbInitializer;

        public ForumThreadRepository(IDBInitializer dbInitializer)
        {
            this.dbInitializer = dbInitializer;
        }

        public async Task<IAsyncCursor<ForumThread>> ThreadsOrderedByDateAsync()
        {
            var options = new FindOptions<ForumThread> { Sort = Builders<ForumThread>.Sort.Ascending(x => x.CreationDate) };

            return await GetCollection().FindAsync(_ => true, options);
        }

        public async Task CreateThreadAsync(string title, string author)
        {
            await GetCollection().InsertOneAsync(new ForumThread { Title = title, Author = author, CreationDate = DateTimeOffset.UtcNow });
        }

        IMongoCollection<ForumThread> GetCollection()
        {
            return dbInitializer.GetDatabase().GetCollection<ForumThread>(DBInitializer.ForumThread);
        }
    }
}
