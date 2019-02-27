using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
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

        public ForumThreadPostController(IForumThreadPostRepository forumThreadPostRepository)
        {
            this.forumThreadPostRepository = forumThreadPostRepository;
        }

        public async Task<IActionResult> PostsOrderedByDate(string threadId)
        {
            var posts = await forumThreadPostRepository.PostsOrderedByDateAsync(threadId);

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
