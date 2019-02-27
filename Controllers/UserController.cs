using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using reactDemo.Core.Repositories;
using System.Threading.Tasks;

namespace reactDemo.Controllers
{
    [Authorize]
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
                Id = user.Id,
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

        [HttpPost]
        public async Task<IActionResult> AddUserAsync([FromBody] UserModel user)
        {
            switch (await userRepository.AddUserAsync(user.Name, user.Password))
            {
                case UserResult.Ok:
                    return Ok();
                case UserResult.UserAlreadyExists:
                    return StatusCode(400, "A user with the same name already exists.");
                default:
                    return StatusCode(400, "An error occurred. Try again later.");
            }
        }

        public class UserModel
        {
            public string Id { get; set; }
            public string CurrentPassword { get; set; }
            public string NewPassword { get; set; }
            public string Name { get; set; }
            public string Password { get; set; }
        }
    }
}
