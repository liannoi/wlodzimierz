using System.Threading.Tasks;
using Application.Paging.API.Models;
using Application.Storage.API.Storage.Contacts.Commands.Create;
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

        [HttpGet("filter")]
        public async Task<ActionResult<PaginatedList<ContactDto>>> GetByFilter([FromQuery] FilterQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}