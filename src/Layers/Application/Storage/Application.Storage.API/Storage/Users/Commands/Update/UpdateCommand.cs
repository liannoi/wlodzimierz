using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Exceptions;
using Application.Infrastructure.Identity.API.Interfaces;
using MediatR;

namespace Application.Storage.API.Storage.Users.Commands.Update
{
    public class UpdateCommand : IRequest
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        private class Handler : IRequestHandler<UpdateCommand>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<Unit> Handle(UpdateCommand request, CancellationToken cancellationToken)
            {
                var result = await _identityService.UpdateAsync(request.UserId);

                return result.Succeeded ? Unit.Value : throw new ForbiddenAccessException();
            }
        }
    }
}