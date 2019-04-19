using MongoDB.Driver;
using reactDemo.Core.Services.Mongo;
using reactDemo.Core.Services.Mongo.Collections.Chat;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.Core.Repositories.Chat
{
    public class ChatRepository : IChatRepository
    {
        readonly IDBInitializer dbInitializer;

        public ChatRepository(IDBInitializer dbInitializer)
        {
            this.dbInitializer = dbInitializer;
        }

        public async Task UserIsOnline(string name)
        {
            var userAlreadyExists = (await GetUserOnlineCollection().FindAsync(x => x.Name == name)).Any();

            if (userAlreadyExists)
            {
                return;
            }

            await GetUserOnlineCollection().InsertOneAsync(new OnlineUser { Name = name });
        }

        public async Task UserIsOffline(string name)
        {
            await GetUserOnlineCollection().DeleteOneAsync(x => x.Name == name);
        }

        public async Task AddMessage(string author, string text)
        {
            await GetMessagesCollection().InsertOneAsync(new ChatMessage { Author = author, Text = text, CreationDate = DateTimeOffset.UtcNow });
        }

        public async Task<IAsyncCursor<OnlineUser>> OnlineUsers()
        {
            return await GetUserOnlineCollection().FindAsync(_ => true);
        }

        public async Task<IAsyncCursor<ChatMessage>> ChatMessagesOrderedByDateAsync()
        {
            var options = new FindOptions<ChatMessage> { Sort = Builders<ChatMessage>.Sort.Ascending(x => x.CreationDate) };

            return await GetMessagesCollection().FindAsync(_ => true, options);
        }


        IMongoCollection<OnlineUser> GetUserOnlineCollection()
        {
            return dbInitializer.GetDatabase().GetCollection<OnlineUser>(DBInitializer.ChatOnlineUsers);
        }

        IMongoCollection<ChatMessage> GetMessagesCollection()
        {
            return dbInitializer.GetDatabase().GetCollection<ChatMessage>(DBInitializer.ChatMessages);
        }
    }
}
