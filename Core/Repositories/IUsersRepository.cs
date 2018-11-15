using reactDemo.Core.Services.Mongo.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace reactDemo.Core.Repositories
{
    public interface IUsersRepository
    {
        Task<User> GetUserAsync(string name, string password);
        Task<UserResult> AddUserAsync(string name, string password);
        IEnumerable<User> GetAllUsers();
        Task DeleteUserAsync(string name);
        Task<bool> ChangeUserPasswordAsync(string name, string password);
    }
}