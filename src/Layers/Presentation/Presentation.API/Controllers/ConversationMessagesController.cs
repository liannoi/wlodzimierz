using System.Threading.Tasks;
using Application.Paging.API.Models;
using Application.Storage.API.Storage.ConversationMessages.Commands.Create;
using Application.Storage.API.Storage.ConversationMessages.Commands.Delete;
using Application.Storage.API.Storage.ConversationMessages.Commands.Update;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.ConversationMessages.Queries.Details;
using Application.Storage.API.Storage.ConversationMessages.Queries.List;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    public class ConversationMessagesController : AbstractController
    {
        #region CRUD

        [HttpGet]
        public async Task<ActionResult<PaginatedList<ConversationMessageDto>>> GetAll([FromQuery] ListQuery query)
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
            if (id != command.ConversationMessageId) return BadRequest();

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteCommand {ConversationMessageId = id});

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ConversationMessageDto>> GetById(int id)
        {
            return await Mediator.Send(new DetailsQuery {ConversationMessageId = id});
        }

        #endregion
    }
}