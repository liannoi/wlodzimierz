using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Exceptions;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using MediatR;

namespace Application.Storage.API.Storage.Users.Core.Commands.Update
{
    public class UpdateCommand : IRequest
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        private class Handler : IRequestHandler<UpdateCommand>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<Unit> Handle(UpdateCommand command, CancellationToken cancellationToken)
            {
                var user = await _identityService.FindByIdAsync(command.UserId);
                user.UserName = command.UserName;
                user.FirstName = command.FirstName;
                user.LastName = command.LastName;
                user.Email = command.Email;
                var result = await _identityService.UpdateAsync(user);

                return result.Succeeded ? Unit.Value : throw new ForbiddenAccessException();
            }
        }
    }
}