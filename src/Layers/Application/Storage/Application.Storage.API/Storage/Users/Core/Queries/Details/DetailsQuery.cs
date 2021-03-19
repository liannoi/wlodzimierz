using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Storage.API.Storage.Users.Core.Models;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Users.Core.Queries.Details
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
                var identityUser = await _identityService.FindByIdAsync(query.UserId);
                var user = _mapper.Map<UserDto>(identityUser);
                user.TwoFactorEnabled = await _identityService.GetTwoFactorEnabledAsync(identityUser);
                user.HasAuthenticator = await _identityService.GetAuthenticatorKeyAsync(identityUser) != null;
                user.TwoFactorClientRemembered = await _identityService.IsTwoFactorClientRememberedAsync(identityUser);

                return user;
            }
        }
    }
}