using System.Threading.Tasks;
using Application.API.Common.Paging;
using Application.API.Storage.Users.Contacts.Models;
using Application.API.Storage.Users.Contacts.Queries.Filter;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.API.Controllers.Users.Contacts
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