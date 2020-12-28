using System.Threading.Tasks;
using Application.Paging.API.Models;
using Application.Storage.API.Storage.Contacts.Commands.Create;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.Contacts.Queries.List;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
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
    }
}