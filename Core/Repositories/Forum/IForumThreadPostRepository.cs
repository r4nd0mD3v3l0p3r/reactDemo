using MongoDB.Driver;
using reactDemo.Core.Services.Mongo.Collections.Forum;
using System.Threading.Tasks;

namespace reactDemo.Core.Repositories.Forum
{
    public interface IForumThreadPostRepository
    {
        Task<IAsyncCursor<ForumThreadPost>> PostsOrderedByDateAsync(string threadId);
        Task CreatePostAsync(string text, string author, string threadId);
    }
}