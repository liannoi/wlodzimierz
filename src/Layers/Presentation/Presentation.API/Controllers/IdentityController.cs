using System.Threading.Tasks;
using Application.API.Storage.Identity.Commands.Signup;
using Application.API.Storage.Identity.Models;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.API.Controllers {
  public class IdentityController : AbstractController {
    [HttpPost("signup")]
    public async Task<ActionResult<JwtToken>>
    Signup([ FromBody ] SignupCommand command) {
      return await Mediator.Send(command);
    }
  }
}
