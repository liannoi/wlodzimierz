using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Storage.API.Storage.Users.Models;
using AutoMapper;
using MediatR;

namespace Application.Storage.API.Storage.Users.Queries.Details
{
    public class DetailsQuery : IRequest<UserDto>
    {
        public string UserId { get; set; }

        private class Handler : IRequestHandler<DetailsQuery, UserDto>
        {
            private readonly IIdentityService _identityService;
            private readonly IMapper _mapper;

            public Handler(IIdentityService identityService, IMapper mapper)
            {
                _identityService = identityService;
                _mapper = mapper;
            }

            public async Task<UserDto> Handle(DetailsQuery request, CancellationToken cancellationToken)
            {
                return _mapper.Map<UserDto>(await _identityService.FindByIdAsync(request.UserId));
            }
        }
    }
}