using System.Threading.Tasks;
using Application.API.Storage.Identity.Commands;
using Application.API.Storage.Identity.Models;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.API.Controllers
{
    public class IdentityController : AbstractController
    {
        [HttpPost("signup")]
        public async Task<ActionResult<JwtToken>> Signup([FromBody] SignupCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}