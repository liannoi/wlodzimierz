using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Interfaces;
using Application.Storage.API.Storage.Users.Models;
using AutoMapper;
using MediatR;

namespace Application.Storage.API.Storage.Users.Commands.Verify
{
    public class VerifyCommand : IRequest<UserDto>
    {
        public string Value { get; set; }

        private class Handler : IRequestHandler<VerifyCommand, UserDto>
        {
            private readonly IIdentityService _identityService;
            private readonly IMapper _mapper;

            public Handler(IIdentityService identityService, IMapper mapper)
            {
                _identityService = identityService;
                _mapper = mapper;
            }

            public async Task<UserDto> Handle(VerifyCommand request, CancellationToken cancellationToken)
            {
                return _mapper.Map<UserDto>(
                    await _identityService.FindByNameAsync(_identityService.ReadToken(request.Value)));
            }
        }
    }
}