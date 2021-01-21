using System.Threading.Tasks;
using Application.Paging.API.Models;
using Application.Storage.API.Storage.Contacts.Commands.Create;
using Application.Storage.API.Storage.Contacts.Commands.Delete;
using Application.Storage.API.Storage.Contacts.Commands.Update;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.Contacts.Queries.Details;
using Application.Storage.API.Storage.Contacts.Queries.Filter;
using Application.Storage.API.Storage.Contacts.Queries.List;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    public class ContactsController : AbstractController
    {
        #region Filtration

        [HttpGet("filter")]
        public async Task<ActionResult<PaginatedList<ContactDto>>> GetByFilter([FromQuery] FilterQuery query)
        {
            return await Mediator.Send(query);
        }

        #endregion

        #region CRUD

        [HttpGet]
        public async Task<ActionResult<PaginatedList<ContactDto>>> GetAll([FromQuery] ListQuery query)
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
            if (id != command.ContactId) return BadRequest();

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteCommand {ContactId = id});

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactDto>> GetById(int id)
        {
            return await Mediator.Send(new DetailsQuery {ContactId = id});
        }

        #endregion
    }
}