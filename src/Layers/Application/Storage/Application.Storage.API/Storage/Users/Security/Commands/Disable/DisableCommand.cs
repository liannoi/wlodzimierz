using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Infrastructure.Identity.API.Common.Models;
using MediatR;

namespace Application.Storage.API.Storage.Users.Security.Commands.Disable
{
    public class DisableCommand : IRequest<IdentityResult>
    {
        public string UserId { get; set; }

        private class Handler : IRequestHandler<DisableCommand, IdentityResult>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<IdentityResult> Handle(DisableCommand command, CancellationToken cancellationToken)
            {
                return await _identityService.DisableTwoFactor(command.UserId);
            }
        }
    }
}