using System.Threading.Tasks;
using Application.API.Storage.Contacts.Commands.Create;
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
    }
}