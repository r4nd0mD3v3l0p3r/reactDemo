using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using reactDemo.Core.Repositories;
using reactDemo.ViewModels;

namespace reactDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ForumThreadController : Controller
    {
        readonly IForumThreadRepository forumThreadRepository;

        public ForumThreadController(IForumThreadRepository forumThreadRepository)
        {
            this.forumThreadRepository = forumThreadRepository;
        }

        public async Task<IActionResult> ThreadsOrderedByDate()
        {
            var threads = await forumThreadRepository.ThreadsOrderedByDateAsync();
         
            return Ok(threads.ToEnumerable()
                             .Select(x => new ForumThreadModel
                                {
                                 Id = x.Id,
                                 Author = x.Author,
                                 CreationDate = x.CreationDate,
                                 Title = x.Title
                                }));
        }
    }
}