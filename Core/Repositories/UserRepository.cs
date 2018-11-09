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
    public class UserRepository : IUserRepository
    {
        readonly IDBInitializer _dBInitializer;

        public UserRepository(IDBInitializer dBInitializer)
        {
            _dBInitializer = dBInitializer;
        }

        public User GetUser(string name, string password)
        {
            return _dBInitializer.GetDatabase().GetCollection<User>(DBInitializer.UsersCollection).AsQueryable().Where(x => x.Password == password && x.Name == name).FirstOrDefault();
        }
    }
}
