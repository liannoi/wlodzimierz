using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Models;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.Conversations.Models;
using Application.Storage.API.Storage.Users.Commands.Delete;
using Application.Storage.API.Storage.Users.Commands.SignIn;
using Application.Storage.API.Storage.Users.Commands.SignUp;
using Application.Storage.API.Storage.Users.Commands.Update;
using Application.Storage.API.Storage.Users.Commands.Verify;
using Application.Storage.API.Storage.Users.Models;
using Application.Storage.API.Storage.Users.Queries.Contacts;
using Application.Storage.API.Storage.Users.Queries.ConversationMessages;
using Application.Storage.API.Storage.Users.Queries.Conversations;
using Application.Storage.API.Storage.Users.Queries.Details;
using Application.Storage.API.Storage.Users.Queries.Filter;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    public class UsersController : AbstractController
    {
        #region Filtration

        [HttpGet("filter")]
        public async Task<ActionResult<PaginatedList<UserDto>>> GetByFilter([FromQuery] FilterQuery query)
        {
            return await Mediator.Send(query);
        }

        #endregion

        #region Authentication

        [HttpPost("signup")]
        public async Task<ActionResult<JwtToken>> Signup([FromBody] SignUpCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("signin")]
        public async Task<ActionResult<JwtToken>> Signin([FromBody] SignInCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("verify")]
        public async Task<ActionResult<UserDto>> Verify([FromBody] VerifyCommand command)
        {
            return await Mediator.Send(command);
        }

        #endregion

        #region *RUD

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, [FromBody] UpdateCommand command)
        {
            if (id != command.UserId) return BadRequest();
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPut("{id}/password")]
        public async Task<ActionResult> Update(string id, [FromBody] UpdatePasswordCommand command)
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

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetById(string id)
        {
            return await Mediator.Send(new DetailsQuery {UserId = id});
        }

        #endregion

        #region Relations

        [HttpGet("contacts")]
        public async Task<ActionResult<PaginatedList<ContactDto>>> GetContacts([FromQuery] ContactsQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("conversation-messages")]
        public async Task<ActionResult<PaginatedList<ConversationMessageDto>>> GetConversationMessages(
            [FromQuery] ConversationMessagesQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("conversations")]
        public async Task<ActionResult<PaginatedList<ConversationDto>>> GetConversations(
            [FromQuery] ConversationsQuery query)
        {
            return await Mediator.Send(query);
        }

        #endregion
    }
}