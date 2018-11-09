using Mongo2Go;
using MongoDB.Driver;
using reactDemo.Core.Services.Mongo.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.Core.Services.Mongo
{
    public class DBInitializer : IDisposable, IDBInitializer
    {
        public const string DBName = "reactDemo";
        public const string UsersCollection = "users";
        readonly MongoDbRunner _runner;
        readonly MongoClient _client;

        public DBInitializer()
        {
            _runner = MongoDbRunner.Start();

            _client = new MongoClient(_runner.ConnectionString);

            CreateUsersCollection();
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
                new User{ Name = "admin", Password = "admin" }
            };

            GetDatabase().GetCollection<User>(UsersCollection).InsertMany(users);
        }
    }
}
