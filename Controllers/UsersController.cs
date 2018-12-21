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

        [HttpDelete]
        public async Task<IActionResult> DeleteUserAsync(string id)
        {
            await userRepository.DeleteUserAsync(id);

            return Ok(AllUsers());
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserPasswordAsync(string id, string password)
        {
            if (await userRepository.ChangeUserPasswordAsync(id, password))
                return Ok();

            return StatusCode(500);
        }

        IEnumerable<UserModel> AllUsers()
        {
            return userRepository.GetAllUsers().Select(x => new UserModel { Id = x.Id.ToString(), Name = x.Name });
        }
    }
}
