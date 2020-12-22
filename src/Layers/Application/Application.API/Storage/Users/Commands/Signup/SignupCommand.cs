using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Identity.Interfaces;
using Application.API.Common.Validation;
using Application.API.Storage.Users.Models.Domain;
using MediatR;

namespace Application.API.Storage.Users.Commands.Signup
{
    public class SignupCommand : IRequest<JwtToken>
    {
        public string UserName { get; set; }
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
                var (result, token) = await _identityService.SignupAsync(request.UserName, request.Password);

                return result.Succeeded ? token : throw new ValidationException(result.Errors.ToFailures());
            }
        }
    }
}