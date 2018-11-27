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
    public class UsersController : Controller
    {
        readonly IUsersRepository userRepository;

        public UsersController(IUsersRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetUsers() => base.Ok(AllUsers());

        [HttpPost]
        public async Task<IActionResult> AddUserAsync([FromBody] UserModel user)
        {
            switch (await userRepository.AddUserAsync(user.Name, user.Password))
            {
                case UserResult.Ok:
                    return Ok(AllUsers());
                case UserResult.UserAlreadyExists:
                    return StatusCode(400, "A user with the same name already exists.");
                default:
                    return StatusCode(400, "An error occurred. Try again later.");
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUserAsync(string name)
        {
            await userRepository.DeleteUserAsync(name);

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserPasswordAsync(string name, string password)
        {
            if (await userRepository.ChangeUserPasswordAsync(name, password))
                return Ok();

            return StatusCode(500);
        }

        IEnumerable<UserModel> AllUsers()
        {
            return userRepository.GetAllUsers().Select(x => new UserModel { Name = x.Name, Password = x.Password });
        }
    }
}
