using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.ViewModels
{
    public class ForumThreadPostModel
    {
        public string Id { get; internal set; }
        public string Author { get; internal set; }
        public DateTimeOffset CreationDate { get; internal set; }
        public string Text { get; internal set; }
    }
}
