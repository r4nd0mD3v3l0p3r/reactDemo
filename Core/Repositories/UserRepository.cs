using MongoDB.Bson;
using MongoDB.Driver;
using reactDemo.Core.Services.Mongo;
using reactDemo.Core.Services.Mongo.Collections;
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

        public async Task<User> GetUserByIdAsync(string id)
        {
            return (await GetCollection().FindAsync(x => x.Id == id)).FirstOrDefault();
        }

        public async Task<User> GetUserByNameAsync(string name)
        {
            return (await GetCollection().FindAsync(x => x.Name == name)).FirstOrDefault();
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

        public async Task DeleteUserAsync(string id)
        {
            await GetCollection().DeleteOneAsync(x => x.Id == id);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return GetCollection().AsQueryable();
        }

        public async Task<bool> ChangeUserPasswordAsync(string id, string password)
        {
            var result = await GetCollection().UpdateOneAsync(x => x.Id == id, Builders<User>.Update.Set(x => x.Password, password));

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
