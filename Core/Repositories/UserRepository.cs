using MongoDB.Driver;
using MongoDB.Driver.Builders;
using reactDemo.Core.Services.Mongo;
using reactDemo.Core.Services.Mongo.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.Core.Repositories
{
    public class UserRepository : IUsersRepository
    {
        readonly IDBInitializer dbInitializer;

        public UserRepository(IDBInitializer dBInitializer)
        {
            dbInitializer = dBInitializer;
        }

        public async Task<User> GetUserAsync(string name, string password)
        {
            return (await GetCollection().FindAsync(x => x.Name == name && x.Password == password)).FirstOrDefault();
        }

        public async Task<UserResult> AddUserAsync(string name, string password)
        {
            var userAlreadyExists = (await GetCollection().FindAsync(x => x.Name == name)).Any();

            if (userAlreadyExists)
            {
                return UserResult.UserAlreadyExists;
            }

            await GetCollection().InsertOneAsync(new User { Name = name, Password = password });

            return UserResult.Ok;
        }

        public async Task DeleteUserAsync(string name)
        {
            await GetCollection().DeleteOneAsync(x => x.Name == name);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return GetCollection().AsQueryable();
        }

        public async Task<bool> ChangeUserPasswordAsync(string name, string password)
        {
            var result = await GetCollection().UpdateOneAsync(x => x.Name == name, Builders<User>.Update.Set(x => x.Password, password));

            return result.IsAcknowledged && result.MatchedCount > 0;
        }

        IMongoCollection<User> GetCollection()
        {
            return dbInitializer.GetDatabase().GetCollection<User>(DBInitializer.UsersCollection);
        }

    }

    public enum UserResult
    {
        Ok,
        UserAlreadyExists
    }
}
