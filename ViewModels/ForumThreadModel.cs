using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.ViewModels
{
    public class ForumThreadModel
    {
        public string Author { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public string Title { get; set; }
        public string Id { get; set; }
    }
}
