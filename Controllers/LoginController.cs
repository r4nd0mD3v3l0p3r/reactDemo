using Microsoft.AspNetCore.Mvc;
using reactDemo.Core.Repositories;
using reactDemo.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        readonly IUsersRepository userRepository;

        public LoginController(IUsersRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpPost]
        public async Task<IActionResult> LoginAsync([FromBody] UserModel user)
        {
            var dbUser = await userRepository.GetUserAsync(user.Name, user.Password);

            if (dbUser == null)
                return StatusCode(401);

            return Ok();
        }
    }
}
