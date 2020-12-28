using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Models;
using Application.Paging.API.Models;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.Users.Commands.Signin;
using Application.Storage.API.Storage.Users.Commands.Signup;
using Application.Storage.API.Storage.Users.Commands.Verify;
using Application.Storage.API.Storage.Users.Models;
using Application.Storage.API.Storage.Users.Queries.Contacts;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
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

        [HttpGet("contacts")]
        public async Task<ActionResult<PaginatedList<ContactDto>>> GetContacts([FromQuery] ContactsQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}