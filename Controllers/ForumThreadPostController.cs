using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using reactDemo.Core.Repositories;
using reactDemo.Core.Repositories.Forum;
using reactDemo.ViewModels;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ForumThreadPostController : Controller
    {
        readonly IForumThreadPostRepository forumThreadPostRepository;
        readonly IForumThreadRepository forumThreadRepository;

        public ForumThreadPostController(IForumThreadPostRepository forumThreadPostRepository, IForumThreadRepository forumThreadRepository)
        {
            this.forumThreadPostRepository = forumThreadPostRepository;
            this.forumThreadRepository = forumThreadRepository;
        }

        public async Task<IActionResult> PostsOrderedByDate(string threadId)
        {
            var posts = await forumThreadPostRepository.PostsOrderedByDateAsync(threadId);
            var thread = await forumThreadRepository.FindById(threadId);

            return Ok(posts.ToEnumerable()
                           .Select(x => new ForumThreadPostModel
                           {
                               Id = x.Id,
                               Author = x.Author,
                               CreationDate = x.CreationDate,
                               Text = x.Text,
                               ThreadTitle = thread.Title
                           }));
        }

        [HttpPost]
        public async Task<IActionResult> AddPost([FromBody] ForumThreadPostModel thread)
        {
            await forumThreadPostRepository.CreatePostAsync(thread.Text, thread.Author, thread.ThreadId);

            var posts = await forumThreadPostRepository.PostsOrderedByDateAsync(thread.ThreadId);

            return Ok(posts.ToEnumerable()
                           .Select(x => new ForumThreadPostModel
                           {
                               Id = x.Id,
                               Author = x.Author,
                               CreationDate = x.CreationDate,
                               Text = x.Text
                           }));
        }
    }
}
