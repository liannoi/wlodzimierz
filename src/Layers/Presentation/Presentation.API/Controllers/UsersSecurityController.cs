using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Models;
using Application.Storage.API.Storage.Users.Security.Commands.Disable;
using Application.Storage.API.Storage.Users.Security.Commands.Generate;
using Application.Storage.API.Storage.Users.Security.Commands.Setup;
using Application.Storage.API.Storage.Users.Security.Commands.Verify;
using Microsoft.AspNetCore.Mvc;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    public class UsersSecurityController : AbstractController
    {
        [HttpPost("generate")]
        public async Task<ActionResult<RecoveryCodesList>> Generate([FromBody] GenerateCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("setup")]
        public async Task<ActionResult<Authenticator>> Setup([FromBody] SetupCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("verify")]
        public async Task<ActionResult> Verify([FromBody] VerifyCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPost("disable")]
        public async Task<ActionResult<IdentityResult>> Disable([FromBody] DisableCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}