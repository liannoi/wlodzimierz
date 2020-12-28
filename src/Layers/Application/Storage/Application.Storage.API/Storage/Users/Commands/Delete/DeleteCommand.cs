using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Exceptions;
using Application.Infrastructure.Identity.API.Interfaces;
using MediatR;

namespace Application.Storage.API.Storage.Users.Commands.Delete
{
    public class DeleteCommand : IRequest
    {
        public string UserId { get; set; }

        private class Handler : IRequestHandler<DeleteCommand>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<Unit> Handle(DeleteCommand request, CancellationToken cancellationToken)
            {
                var result = await _identityService.DeleteAsync(request.UserId);

                return result.Succeeded ? Unit.Value : throw new ForbiddenAccessException();
            }
        }
    }
}