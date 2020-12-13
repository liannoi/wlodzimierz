using System.Threading.Tasks;
using Application.API.Common.Paging.Types;
using Application.API.Storage.Contacts.Core.Commands.Create;
using Application.API.Storage.Contacts.Core.Commands.Delete;
using Application.API.Storage.Contacts.Core.Commands.Update;
using Application.API.Storage.Contacts.Core.Models;
using Application.API.Storage.Contacts.Core.Queries.Details;
using Application.API.Storage.Contacts.Core.Queries.List;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.API.Controllers
{
    public class ContactsController : AbstractController
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<CompactContactDto>>> GetAll([FromQuery] ListQuery query)
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