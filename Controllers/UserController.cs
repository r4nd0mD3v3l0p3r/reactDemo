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

        [HttpPut]
        public async Task<IActionResult> EditUser([FromBody] UserModel userModel)
        {
            var user = await userRepository.GetUserByIdAsync(userModel.Id);

            if (userModel.CurrentPassword != user.Password)
            {
                return StatusCode(400, "The current password you provided is wrong.");
            }

            await userRepository.ChangeUserPasswordAsync(userModel.Id, userModel.NewPassword);

            return Ok();
        }

        public class UserModel
        {
            public string Id { get; set; }
            public string CurrentPassword { get; set; }
            public string NewPassword { get; set; }
            public string Name { get; set; }
        }
    }
}
