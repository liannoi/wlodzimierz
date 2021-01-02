using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Models;
using Application.Paging.API.Models;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.Conversations.Models;
using Application.Storage.API.Storage.Users.Commands.Delete;
using Application.Storage.API.Storage.Users.Commands.Signin;
using Application.Storage.API.Storage.Users.Commands.Signup;
using Application.Storage.API.Storage.Users.Commands.Update;
using Application.Storage.API.Storage.Users.Models;
using Application.Storage.API.Storage.Users.Queries.Contacts;
using Application.Storage.API.Storage.Users.Queries.ConversationMessages;
using Application.Storage.API.Storage.Users.Queries.Conversations;
using Application.Storage.API.Storage.Users.Queries.Verify;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    // TODO: Refactoring is possible by transferring the code to inherited classes.
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

        [HttpGet("{user}/contacts")]
        public async Task<ActionResult<PaginatedList<ContactDto>>> GetContacts(string user)
        {
            return await Mediator.Send(new ContactsQuery {OwnerUserId = user});
        }

        [HttpGet("{user}/conversation-messages")]
        public async Task<ActionResult<PaginatedList<ConversationMessageDto>>> GetConversationMessages(string user)
        {
            return await Mediator.Send(new ConversationMessagesQuery {OwnerUserId = user});
        }

        [HttpGet("{user}/conversations")]
        public async Task<ActionResult<PaginatedList<ConversationDto>>> GetConversations(string user)
        {
            return await Mediator.Send(new ConversationsQuery {OwnerUserId = user});
        }
    }
}