using Microsoft.AspNetCore.SignalR;
using MongoDB.Driver;
using reactDemo.Core.Repositories.Chat;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.Controllers
{
    public class ChatHub : Hub
    {
        readonly IChatRepository chatRepository;

        public ChatHub(IChatRepository chatRepository)
        {
            this.chatRepository = chatRepository;
        }

        public async Task UserOnline(string name)
        {
            await chatRepository.UserIsOnline(name);
            await SendUsersOnlineAsync();
        }

        public async Task UserOffline(string name)
        {
            await chatRepository.UserIsOffline(name);
            await SendUsersOnlineAsync();
        }

        public async Task SendMessage(string author, string text)
        {
            await chatRepository.AddMessage(author, text);
            var messages = (await chatRepository.ChatMessagesOrderedByDateAsync()).ToEnumerable();
            await Clients.All.SendAsync("sendMessage", messages.Select(x => new { x.Author, x.Text, x.CreationDate}));
        }

        private async Task SendUsersOnlineAsync()
        {
            var onlineUsers = (await chatRepository.OnlineUsers()).ToEnumerable();
            await Clients.All.SendAsync("usersOnline", onlineUsers.Select(x => x.Name));
        }
    }
}
