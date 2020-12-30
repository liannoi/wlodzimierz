using System.Threading.Tasks;
using Application.Paging.API.Models;
using Application.Storage.API.Storage.Conversations.Models;
using Application.Storage.API.Storage.Conversations.Queries.List;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    public class ConversationsController : AbstractController
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<ConversationDto>>> GetAll([FromQuery] ListQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}