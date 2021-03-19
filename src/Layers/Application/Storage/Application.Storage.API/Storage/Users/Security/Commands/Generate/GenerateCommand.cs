using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Infrastructure.Identity.API.Common.Models;
using MediatR;

namespace Application.Storage.API.Storage.Users.Security.Commands.Generate
{
    public class GenerateCommand : IRequest<RecoveryCodesList>
    {
        public string UserId { get; set; }

        private class Handler : IRequestHandler<GenerateCommand, RecoveryCodesList>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<RecoveryCodesList> Handle(GenerateCommand command, CancellationToken cancellationToken)
            {
                return await _identityService.GenerateRecoveryCodes(command.UserId);
            }
        }
    }
}