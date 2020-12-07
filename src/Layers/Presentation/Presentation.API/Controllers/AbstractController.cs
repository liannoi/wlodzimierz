using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Presentation.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class AbstractController : ControllerBase
    {
        private ISender? _mediator;

        protected ISender Mediator => (_mediator ??= HttpContext.RequestServices.GetService<ISender>())!;
    }
}