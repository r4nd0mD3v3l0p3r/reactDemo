using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.ViewModels
{
    public class ChatMessage
    {
        public string Author { get; set; }
        public string Text { get; set; }
        public DateTimeOffset CreationDate { get; set; }
    }
}
