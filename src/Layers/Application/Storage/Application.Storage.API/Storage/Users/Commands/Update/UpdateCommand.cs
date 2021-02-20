using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Exceptions;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using MediatR;

namespace Application.Storage.API.Storage.Users.Commands.Update
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

            public async Task<Unit> Handle(UpdateCommand request, CancellationToken cancellationToken)
            {
                var user = await _identityService.FindByIdAsync(request.UserId);
                user.UserName = request.UserName;
                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                user.Email = request.Email;
                var result = await _identityService.UpdateAsync(user);

                return result.Succeeded ? Unit.Value : throw new ForbiddenAccessException();
            }
        }
    }
}