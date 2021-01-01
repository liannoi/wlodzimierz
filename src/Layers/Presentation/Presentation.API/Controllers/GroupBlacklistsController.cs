using System.Threading.Tasks;
using Application.Paging.API.Models;
using Application.Storage.API.Storage.GroupBlacklists.Commands.Create;
using Application.Storage.API.Storage.GroupBlacklists.Commands.Delete;
using Application.Storage.API.Storage.GroupBlacklists.Commands.Update;
using Application.Storage.API.Storage.GroupBlacklists.Models;
using Application.Storage.API.Storage.GroupBlacklists.Queries.Details;
using Application.Storage.API.Storage.GroupBlacklists.Queries.List;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    public class GroupBlacklistsController : AbstractController
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<GroupBlacklistDto>>> GetAll([FromQuery] ListQuery query)
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
            if (id != command.GroupBlacklistId) return BadRequest();

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteCommand {GroupBlacklistId = id});

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GroupBlacklistDto>> GetById(int id)
        {
            return await Mediator.Send(new DetailsQuery {GroupBlacklistId = id});
        }
    }
}