using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.ViewModels
{
    public class ForumThreadPostModel
    {
        public string Id { get; set; }
        public string Author { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public string Text { get; set; }
        public string ThreadId { get; set; }
    }
}
