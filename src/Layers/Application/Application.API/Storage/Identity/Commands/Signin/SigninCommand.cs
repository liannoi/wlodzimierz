using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Core.Exceptions;
using Application.API.Common.Infrastructure.Identity.Interfaces;
using Application.API.Storage.Identity.Entities;
using MediatR;

namespace Application.API.Storage.Identity.Commands.Signin
{
    public class SigninCommand : IRequest<JwtToken>
    {
        public string UserName { get; set; }
        public string Password { get; set; }

        private class Handler : IRequestHandler<SigninCommand, JwtToken>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<JwtToken> Handle(SigninCommand request, CancellationToken cancellationToken)
            {
                var (result, token) = await _identityService.SigninAsync(request.UserName, request.Password);

                return result.Succeeded
                    ? token
                    : throw new ForbiddenAccessException();
            }
        }
    }
}