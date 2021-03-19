using System.Threading.Tasks;
using Application.Storage.API.Storage.Users.Security.Models;
using Application.Storage.API.Storage.Users.Security.Queries;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    public class UsersSecurityController : AbstractController
    {
        [HttpGet("setup")]
        public async Task<ActionResult<Authenticator>> Setup([FromQuery] SetupQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}