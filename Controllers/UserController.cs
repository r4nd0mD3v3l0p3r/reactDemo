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
    public class UserController : Controller
    {
        readonly IUsersRepository userRepository;

        public UserController(IUsersRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> UserAsync(string id)
        {
            var user = await userRepository.GetUserByIdAsync(id);

            return Ok(new UserModel
            {
                Id = user.Id.ToString(),
                Name = user.Name
            });
        }
    }
}
