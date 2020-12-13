using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Identity.Interfaces;
using Application.API.Storage.Users.Core.Models;
using MediatR;

namespace Application.API.Storage.Users.Core.Commands.Verify
{
    public class VerifyCommand : IRequest<UserDto>
    {
        public string Value { get; set; }

        private class Handler : IRequestHandler<VerifyCommand, UserDto>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<UserDto> Handle(VerifyCommand request, CancellationToken cancellationToken)
            {
                var user = await _identityService.FindByNameAsync(_identityService.ReadToken(request.Value));

                return new UserDto
                {
                    UserId = user.Id,
                    UserName = user.UserName
                };
            }
        }
    }
}