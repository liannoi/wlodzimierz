using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Identity.Interfaces;
using Application.API.Storage.Identity.Models;
using MediatR;

namespace Application.API.Storage.Identity.Commands.Verify
{
    public class VerifyCommand : IRequest<DetailsViewModel>
    {
        public string Value { get; set; }

        private class Handler : IRequestHandler<VerifyCommand, DetailsViewModel>
        {
            private readonly IIdentityService _identityService;

            public Handler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<DetailsViewModel> Handle(VerifyCommand request, CancellationToken cancellationToken)
            {
                var user = await _identityService.FindByNameAsync(_identityService.ReadToken(request.Value));

                return new DetailsViewModel
                {
                    UserId = user.Id,
                    UserName = user.UserName
                };
            }
        }
    }
}