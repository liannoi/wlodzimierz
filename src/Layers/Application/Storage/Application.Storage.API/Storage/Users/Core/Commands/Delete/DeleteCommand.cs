using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Exceptions;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using MediatR;

namespace Application.Storage.API.Storage.Users.Core.Commands.Delete
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

            public async Task<Unit> Handle(DeleteCommand command, CancellationToken cancellationToken)
            {
                var result = await _identityService.DeleteAsync(command.UserId);

                return result.Succeeded ? Unit.Value : throw new ForbiddenAccessException();
            }
        }
    }
}