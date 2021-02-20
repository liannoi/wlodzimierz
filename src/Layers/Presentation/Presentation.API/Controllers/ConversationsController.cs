using System.Threading.Tasks;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.Conversations.Commands.Create;
using Application.Storage.API.Storage.Conversations.Commands.Delete;
using Application.Storage.API.Storage.Conversations.Commands.Update;
using Application.Storage.API.Storage.Conversations.Models;
using Application.Storage.API.Storage.Conversations.Queries.Details;
using Application.Storage.API.Storage.Conversations.Queries.List;
using Application.Storage.API.Storage.Conversations.Queries.Messages;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    public class ConversationsController : AbstractController
    {
        #region Relations

        [HttpGet("{conversation}/messages")]
        public async Task<ActionResult<PaginatedList<ConversationMessageDto>>> GetMessages(int conversation,
            [FromQuery] MessagesQuery query)
        {
            query.ConversationId = conversation;

            return await Mediator.Send(query);
        }

        #endregion

        #region CRUD

        [HttpGet]
        public async Task<ActionResult<PaginatedList<ConversationDto>>> GetAll([FromQuery] ListQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create([FromBody] CreateCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateCommand command)
        {
            if (id != command.ConversationId) return BadRequest();

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteCommand {ConversationId = id});

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ConversationDto>> GetById(int id)
        {
            return await Mediator.Send(new DetailsQuery {ConversationId = id});
        }

        #endregion
    }
}