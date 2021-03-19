using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Exceptions;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using MediatR;

namespace Application.Storage.API.Storage.Users.Core.Commands.Update
{
    public class UpdatePasswordCommand : IRequest
    {
        public string UserId { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }

        private class Handler : IRequestHandler<UpdatePasswordCommand>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<Unit> Handle(UpdatePasswordCommand request, CancellationToken cancellationToken)
            {
                var user = await _identityService.FindByIdAsync(request.UserId);
                var verificationResult = _identityService.VerifyPassword(user, request.CurrentPassword);
                if (!verificationResult.Succeeded) throw new ForbiddenAccessException();
                var result = await _identityService.UpdateAsync(user, request.NewPassword);

                return result.Succeeded ? Unit.Value : throw new ForbiddenAccessException();
            }
        }
    }
}