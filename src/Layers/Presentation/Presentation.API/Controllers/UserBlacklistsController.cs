using System.Threading.Tasks;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Storage.UserBlacklists.Commands.Create;
using Application.Storage.API.Storage.UserBlacklists.Commands.Delete;
using Application.Storage.API.Storage.UserBlacklists.Commands.Update;
using Application.Storage.API.Storage.UserBlacklists.Models;
using Application.Storage.API.Storage.UserBlacklists.Queries.Details;
using Application.Storage.API.Storage.UserBlacklists.Queries.List;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    public class UserBlacklistsController : AbstractController
    {
        #region CRUD

        [HttpGet]
        public async Task<ActionResult<PaginatedList<UserBlacklistDto>>> GetAll([FromQuery] ListQuery query)
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
            if (id != command.UserBlacklistId) return BadRequest();

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteCommand {UserBlacklistId = id});

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserBlacklistDto>> GetById(int id)
        {
            return await Mediator.Send(new DetailsQuery {UserBlacklistId = id});
        }

        #endregion
    }
}