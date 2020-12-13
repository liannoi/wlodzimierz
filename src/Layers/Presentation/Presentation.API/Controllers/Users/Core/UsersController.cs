using System.Threading.Tasks;
using Application.API.Storage.Users.Core.Commands.Signin;
using Application.API.Storage.Users.Core.Commands.Signup;
using Application.API.Storage.Users.Core.Commands.Verify;
using Application.API.Storage.Users.Core.Models;
using Application.API.Storage.Users.Core.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Core.Controllers;

namespace Presentation.API.Controllers.Users.Core
{
    public class UsersController : AbstractController
    {
        [HttpPost("signup")]
        public async Task<ActionResult<JwtToken>> Signup([FromBody] SignupCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("signin")]
        public async Task<ActionResult<JwtToken>> Signin([FromBody] SigninCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("verify")]
        public async Task<ActionResult<UserDto>> Verify([FromBody] VerifyCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}