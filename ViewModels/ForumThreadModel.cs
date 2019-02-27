using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.ViewModels
{
    public class ForumThreadModel
    {
        public string Author { get; internal set; }
        public DateTimeOffset CreationDate { get; internal set; }
        public string Title { get; internal set; }
        public string Id { get; internal set; }
    }
}
