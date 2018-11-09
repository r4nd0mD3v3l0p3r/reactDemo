using reactDemo.Core.Services.Mongo.Collections;

namespace reactDemo.Core.Repositories
{
    public interface IUserRepository
    {
        User GetUser(string name, string password);
    }
}