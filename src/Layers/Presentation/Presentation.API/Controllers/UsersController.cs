using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Models;
using Application.Paging.API.Models;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.Users.Commands.Delete;
using Application.Storage.API.Storage.Users.Commands.Signin;
using Application.Storage.API.Storage.Users.Commands.Signup;
using Application.Storage.API.Storage.Users.Commands.Update;
using Application.Storage.API.Storage.Users.Models;
using Application.Storage.API.Storage.Users.Queries.Contacts;
using Application.Storage.API.Storage.Users.Queries.Verify;
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

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, [FromQuery] UpdateCommand command)
        {
            if (id != command.UserId) return BadRequest();

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await Mediator.Send(new DeleteCommand {UserId = id});

            return NoContent();
        }

        [HttpGet("{jwt}")]
        public async Task<ActionResult<UserDto>> GetByJwt(string jwt)
        {
            return await Mediator.Send(new VerifyQuery {Value = jwt});
        }

        [HttpGet("contacts")]
        public async Task<ActionResult<PaginatedList<ContactDto>>> GetContacts([FromQuery] ContactsQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}