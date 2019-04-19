using System.Threading.Tasks;
using MongoDB.Driver;
using reactDemo.Core.Services.Mongo.Collections.Chat;

namespace reactDemo.Core.Repositories.Chat
{
    public interface IChatRepository
    {
        Task AddMessage(string author, string text);
        Task<IAsyncCursor<ChatMessage>> ChatMessagesOrderedByDateAsync();
        Task<IAsyncCursor<OnlineUser>> OnlineUsers();
        Task UserIsOffline(string name);
        Task UserIsOnline(string name);
    }
}