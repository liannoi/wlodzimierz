using System.Threading.Tasks;
using Application.Paging.API.Models;
using Application.Storage.API.Storage.GroupAdministrators.Commands.Create;
using Application.Storage.API.Storage.GroupAdministrators.Commands.Delete;
using Application.Storage.API.Storage.GroupAdministrators.Commands.Update;
using Application.Storage.API.Storage.GroupAdministrators.Models;
using Application.Storage.API.Storage.GroupAdministrators.Queries.Details;
using Application.Storage.API.Storage.GroupAdministrators.Queries.List;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    public class GroupAdministratorController : AbstractController
    {
        #region CRUD

        [HttpGet]
        public async Task<ActionResult<PaginatedList<GroupAdministratorDto>>> GetAll([FromQuery] ListQuery query)
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
            if (id != command.GroupAdministratorId) return BadRequest();

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteCommand {GroupAdministratorId = id});

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GroupAdministratorDto>> GetById(int id)
        {
            return await Mediator.Send(new DetailsQuery {GroupAdministratorId = id});
        }

        #endregion
    }
}