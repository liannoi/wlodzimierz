using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Exceptions;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Infrastructure.Identity.API.Common.Models;
using MediatR;

namespace Application.Storage.API.Storage.Users.Commands.SignIn
{
    public class SignInCommand : IRequest<JwtToken>
    {
        public string UserName { get; set; }
        public string Password { get; set; }

        private class Handler : IRequestHandler<SignInCommand, JwtToken>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<JwtToken> Handle(SignInCommand command, CancellationToken cancellationToken)
            {
                var (result, token) = await _identityService.SignInAsync(command.UserName, command.Password);

                return result.Succeeded ? token : throw new ForbiddenAccessException();
            }
        }
    }
}