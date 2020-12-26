using System.Threading.Tasks;
using Application.Storage.API.Storage.Contacts.Commands.Create;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

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