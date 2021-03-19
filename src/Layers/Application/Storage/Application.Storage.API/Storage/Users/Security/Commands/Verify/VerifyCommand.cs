using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using MediatR;

namespace Application.Storage.API.Storage.Users.Security.Commands.Verify
{
    public class VerifyCommand : IRequest
    {
        public string UserId { get; set; }
        public string VerificationCode { get; set; }

        private class Handler : IRequestHandler<VerifyCommand>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<Unit> Handle(VerifyCommand command, CancellationToken cancellationToken)
            {
                await _identityService.VerifyCode(command.UserId, command.VerificationCode);

                return Unit.Value;
            }
        }
    }
}