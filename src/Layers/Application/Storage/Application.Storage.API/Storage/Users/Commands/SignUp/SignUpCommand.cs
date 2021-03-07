using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Infrastructure.Identity.API.Common.Models;
using Application.Validation.API.Common.Extensions;
using Application.Validation.API.Exceptions;
using MediatR;

namespace Application.Storage.API.Storage.Users.Commands.SignUp
{
    public class SignUpCommand : IRequest<JwtToken>
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        private class Handler : IRequestHandler<SignUpCommand, JwtToken>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<JwtToken> Handle(SignUpCommand command, CancellationToken cancellationToken)
            {
                var (result, token) =
                    await _identityService.SignUpAsync(command.UserName, command.Email, command.Password);

                return result.Succeeded ? token : throw new ValidationException(result.Errors.ToFailures());
            }
        }
    }
}