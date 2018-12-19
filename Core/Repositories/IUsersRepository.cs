using reactDemo.Core.Services.Mongo.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace reactDemo.Core.Repositories
{
    public interface IUsersRepository
    {
        Task<User> GetUserByIdAsync(string id);
        Task<User> GetUserByNameAsync(string name);
        Task<UserResult> AddUserAsync(string name, string password);
        IEnumerable<User> GetAllUsers();
        Task DeleteUserAsync(string id);
        Task<bool> ChangeUserPasswordAsync(string id, string password);
    }
}