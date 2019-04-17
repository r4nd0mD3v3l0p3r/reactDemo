using MongoDB.Driver;
using reactDemo.Core.Services.Mongo.Collections;
using System.Threading.Tasks;

namespace reactDemo.Core.Repositories
{
    public interface IForumThreadRepository
    {
        Task<IAsyncCursor<ForumThread>> ThreadsOrderedByDateAsync();
        Task CreateThreadAsync(string title, string author);
        Task<ForumThread> FindById(string id);
    }
}