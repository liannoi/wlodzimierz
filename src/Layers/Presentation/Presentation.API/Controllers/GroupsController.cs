using System.Threading.Tasks;
using Application.Paging.API.Models;
using Application.Storage.API.Storage.Groups.Commands.Create;
using Application.Storage.API.Storage.Groups.Commands.Delete;
using Application.Storage.API.Storage.Groups.Commands.Update;
using Application.Storage.API.Storage.Groups.Models;
using Application.Storage.API.Storage.Groups.Queries.Details;
using Application.Storage.API.Storage.Groups.Queries.List;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    public class GroupsController : AbstractController
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<GroupDto>>> GetAll([FromQuery] ListQuery query)
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
            if (id != command.GroupId) return BadRequest();

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteCommand {GroupId = id});

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GroupDto>> GetById(int id)
        {
            return await Mediator.Send(new DetailsQuery {GroupId = id});
        }
    }
}