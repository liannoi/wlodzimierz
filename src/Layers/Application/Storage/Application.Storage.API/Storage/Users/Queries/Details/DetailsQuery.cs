using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Storage.API.Storage.Users.Models;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Users.Queries.Details
{
    public class DetailsQuery : IRequest<UserDto>
    {
        public string UserId { get; set; }

        private class Handler : IRequestHandler<DetailsQuery, UserDto>
        {
            private readonly IIdentityService _identityService;
            private readonly ILogger<Handler> _logger;
            private readonly IMapper _mapper;

            public Handler(IIdentityService identityService, IMapper mapper, ILogger<Handler> logger)
            {
                _identityService = identityService;
                _mapper = mapper;
                _logger = logger;
            }

            public async Task<UserDto> Handle(DetailsQuery query, CancellationToken cancellationToken)
            {
                _logger.LogInformation("[WLODZIMIERZ.API / Users] Reading from the database: {Name} {@Query}",
                    nameof(DetailsQuery), query);

                return await ReadFromDatabase(query);
            }

            // Helpers.

            private async Task<UserDto> ReadFromDatabase(DetailsQuery query)
            {
                return _mapper.Map<UserDto>(await _identityService.FindByIdAsync(query.UserId));
            }
        }
    }
}