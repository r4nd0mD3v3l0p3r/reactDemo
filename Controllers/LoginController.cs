using Microsoft.AspNetCore.Mvc;
using reactDemo.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        readonly IUserRepository userRepository;

        public LoginController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpPost]
        public IActionResult Login([FromBody] User user)
        {
            var dbUser = userRepository.GetUser(user.Name, user.Password);

            if (dbUser == null)
                return NotFound();

            return Ok();
        }
    }

    public class User
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }

}
