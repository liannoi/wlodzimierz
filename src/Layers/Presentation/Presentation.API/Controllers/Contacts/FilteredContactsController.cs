using System.Threading.Tasks;
using Application.API.Common.Paging;
using Application.API.Storage.Contacts.Models;
using Application.API.Storage.Contacts.Queries.Filter;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Core.Controllers;

namespace Presentation.API.Controllers.Contacts
{
    public class FilteredContactsController : AbstractController
    {
        [HttpPost]
        public async Task<ActionResult<PaginatedList<ContactDto>>> FindBy([FromBody] FilterQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}