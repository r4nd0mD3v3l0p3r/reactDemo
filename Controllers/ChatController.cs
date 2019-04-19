using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using reactDemo.Core.Repositories.Chat;
using reactDemo.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ChatController : Controller
    {
        readonly IChatRepository chatRepository;

        public ChatController(IChatRepository chatRepository)
        {
            this.chatRepository = chatRepository;
        }

        [HttpGet]
        public async Task<IActionResult> AllMessages()
        {
            var messages = (await chatRepository.ChatMessagesOrderedByDateAsync()).ToEnumerable();

            return Ok(messages.Select(x => new ChatMessage { Author = x.Author, Text = x.Text, CreationDate = x.CreationDate }));
        }
    }
}
