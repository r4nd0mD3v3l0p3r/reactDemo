using Mongo2Go;
using MongoDB.Driver;
using reactDemo.Core.Services.Mongo.Collections;
using reactDemo.Core.Services.Mongo.Collections.Chat;
using reactDemo.Core.Services.Mongo.Collections.Forum;
using System;
using System.Collections.Generic;
using System.Linq;

namespace reactDemo.Core.Services.Mongo
{
    public class DBInitializer : IDisposable, IDBInitializer
    {
        public const string DBName = "reactDemo";
        public const string UsersCollection = "users";
        public const string ForumThread = "forumThreads";
        public const string ForumThreadPost = "forumThreadPosts";
        public const string ChatOnlineUsers = "chatOnlineUsers";
        public const string ChatMessages = "chatMessages";
        readonly MongoDbRunner _runner;
        readonly MongoClient _client;

        public DBInitializer()
        {
            _runner = MongoDbRunner.Start();

            _client = new MongoClient(_runner.ConnectionString);

            CreateUsersCollection();
            CreateDefaultThreads();
        }

        public void Dispose()
        {
            if (_runner != null && !_runner.Disposed)
                _runner.Dispose();
        }

        public IMongoDatabase GetDatabase() => _client.GetDatabase(DBName);

        void CreateUsersCollection()
        {
            var users = new List<User>
            {
                new User{ Name = "admin", Password = "admin" },
                new User{ Name = "Edgar Allan Poe", Password = "Edgar" },
                new User{ Name = "Stephen King", Password = "Stephen" },
                new User{ Name = "Howard P. Lovecraft", Password = "Howard" },
                new User{ Name = "Fox Mulder", Password = "Fox" },
                new User{ Name = "Dana Scully", Password = "Dana" },
                new User{ Name = "Samuel Winchester", Password = "Samuel" },
                new User{ Name = "Dean Winchester", Password = "Dean" },
            };

            GetDatabase().GetCollection<User>(UsersCollection).InsertMany(users);
        }

        void CreateDefaultThreads()
        {
            var welcomeThread = new ForumThread { Title = "Welcome!", Author = "admin", CreationDate = DateTime.UtcNow };
            GetDatabase().GetCollection<ForumThread>(ForumThread).InsertOne(welcomeThread);

            var welcomePost = new ForumThreadPost { ThreadId = welcomeThread.Id, Author = "admin", CreationDate = DateTime.UtcNow, Text = "Welcome all to our forum!" };
            GetDatabase().GetCollection<ForumThreadPost>(ForumThreadPost).InsertOne(welcomePost);

            var presentationThread = new ForumThread { Title = "Present yourself to our community", Author = "admin", CreationDate = DateTime.UtcNow.AddMinutes(10) };
            GetDatabase().GetCollection<ForumThread>(ForumThread).InsertOne(presentationThread);

            var presentationPost = new ForumThreadPost { ThreadId = presentationThread.Id,
                                             Author = "admin",
                                             CreationDate = DateTime.UtcNow.AddMinutes(9),
                                             Text = "Hi, if you are new to the forum, please introduce yourself here." };
            GetDatabase().GetCollection<ForumThreadPost>(ForumThreadPost).InsertOne(presentationPost);
        }
    }
}
