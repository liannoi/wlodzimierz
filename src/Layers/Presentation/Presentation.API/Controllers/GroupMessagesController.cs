using System.Threading.Tasks;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Storage.GroupMessages.Commands.Create;
using Application.Storage.API.Storage.GroupMessages.Commands.Delete;
using Application.Storage.API.Storage.GroupMessages.Commands.Update;
using Application.Storage.API.Storage.GroupMessages.Models;
using Application.Storage.API.Storage.GroupMessages.Queries.Details;
using Application.Storage.API.Storage.GroupMessages.Queries.List;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    public class GroupMessagesController : AbstractController
    {
        #region CRUD

        [HttpGet]
        public async Task<ActionResult<PaginatedList<GroupMessageDto>>> GetAll([FromQuery] ListQuery query)
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
            if (id != command.GroupMessageId) return BadRequest();

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteCommand {GroupMessageId = id});

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GroupMessageDto>> GetById(int id)
        {
            return await Mediator.Send(new DetailsQuery {GroupMessageId = id});
        }

        #endregion
    }
}