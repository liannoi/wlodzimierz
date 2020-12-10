using System.Threading.Tasks;
using Application.API.Storage.Contacts.Commands.Create;
using Application.API.Storage.Contacts.Commands.Update;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.API.Controllers
{
    public class ContactsController : AbstractController
    {
        [HttpPost]
        public async Task<ActionResult<int>> Create([FromBody] CreateCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateCommand command)
        {
            if (id != command.ContactId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }
    }
}