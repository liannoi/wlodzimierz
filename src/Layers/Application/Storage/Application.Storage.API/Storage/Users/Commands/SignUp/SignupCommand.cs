using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Interfaces;
using Application.Infrastructure.Identity.API.Models;
using Application.Validation.API.Exceptions;
using Application.Validation.API.Extensions;
using MediatR;

namespace Application.Storage.API.Storage.Users.Commands.SignUp
{
    public class SignupCommand : IRequest<JwtToken>
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        private class Handler : IRequestHandler<SignupCommand, JwtToken>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<JwtToken> Handle(SignupCommand request, CancellationToken cancellationToken)
            {
                var (result, token) =
                    await _identityService.SignUpAsync(request.UserName, request.Email, request.Password);

                return result.Succeeded ? token : throw new ValidationException(result.Errors.ToFailures());
            }
        }
    }
}