using System.Threading.Tasks;
using Application.API.Storage.Identity.Commands.Signin;
using Application.API.Storage.Identity.Commands.Signup;
using Application.API.Storage.Identity.Commands.Verify;
using Application.API.Storage.Identity.Models;
using Application.API.Storage.Identity.Models.Core;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.API.Controllers
{
    public class IdentityController : AbstractController
    {
        [HttpPost("signup")]
        public async Task<ActionResult<JwtToken>> Signup([FromBody] SignupCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("signin")]
        public async Task<ActionResult<JwtToken>> Signin([FromBody] SigninCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("verify")]
        public async Task<ActionResult<DetailsViewModel>> Verify([FromBody] VerifyCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}