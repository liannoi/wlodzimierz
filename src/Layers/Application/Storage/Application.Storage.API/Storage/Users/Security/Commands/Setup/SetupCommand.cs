using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Infrastructure.Identity.API.Common.Models;
using MediatR;

namespace Application.Storage.API.Storage.Users.Security.Commands.Setup
{
    public class SetupCommand : IRequest<Authenticator>
    {
        public string UserId { get; set; }

        private class Handler : IRequestHandler<SetupCommand, Authenticator>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<Authenticator> Handle(SetupCommand command, CancellationToken cancellationToken)
            {
                return await _identityService.SetupAuthenticator(command.UserId);
            }
        }
    }
}