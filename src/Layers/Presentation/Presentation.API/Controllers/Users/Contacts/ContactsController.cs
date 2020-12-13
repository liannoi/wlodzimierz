using System.Threading.Tasks;
using Application.API.Common.Paging.Types;
using Application.API.Storage.Users.Contacts.Commands.Create;
using Application.API.Storage.Users.Contacts.Commands.Delete;
using Application.API.Storage.Users.Contacts.Commands.Update;
using Application.API.Storage.Users.Contacts.Models;
using Application.API.Storage.Users.Contacts.Queries.Details;
using Application.API.Storage.Users.Contacts.Queries.List;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Core.Controllers;

namespace Presentation.API.Controllers.Users.Contacts
{
    public class ContactsController : AbstractController
    {
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

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactDto>> GetById(int id)
        {
            return await Mediator.Send(new DetailsQuery {ContactId = id});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateCommand command)
        {
            if (id != command.ContactId) return BadRequest();

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteCommand {ContactId = id});

            return NoContent();
        }
    }
}