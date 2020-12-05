using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Presentation.API.Core
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class AbstractController : ControllerBase
    {
        private IMediator? _mediator;

        protected IMediator Mediator => (_mediator ??= HttpContext.RequestServices.GetService<IMediator>())!;
    }
}