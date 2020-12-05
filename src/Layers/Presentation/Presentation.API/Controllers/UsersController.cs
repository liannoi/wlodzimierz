using System;
using System.Threading.Tasks;
using Application.API.Storage.Users.Commands;
using Application.API.Storage.Users.Models;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Core;

namespace Presentation.API.Controllers
{
    public class UsersController : AbstractController
    {
        [HttpPost("signup")]
        public async Task<ActionResult<JwtToken>> Signup([FromBody] SignupCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}