using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Filtration.API.Extensions;
using Application.Infrastructure.Caching.API.Extensions;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Common.Models;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Common.Interfaces;
using Application.Storage.API.Storage.Users.Core.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Users.Core.Queries.Filter
{
    public class FilterQuery : IRequest<PaginatedList<UserDto>>, IIdentifier
    {
        public string? UserId { get; set; }
        public string UserName { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        public dynamic Identify()
        {
            return new {UserId, UserName, Email, FirstName, LastName, PageNumber, PageSize};
        }

        private class Handler : IRequestHandler<FilterQuery, PaginatedList<UserDto>>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IIdentityService _identityService;
            private readonly ILogger<Handler> _logger;
            private readonly IMapper _mapper;

            public Handler(IIdentityService identityService, IMapper mapper, IWlodzimierzCachingContext cache,
                ILogger<Handler> logger)
            {
                _identityService = identityService;
                _mapper = mapper;
                _cache = cache;
                _logger = logger;
            }

            public async Task<PaginatedList<UserDto>> Handle(FilterQuery query, CancellationToken cancellationToken)
            {
                var model = new UserDto
                {
                    UserId = query.UserId ?? string.Empty,
                    UserName = query.UserName,
                    Email = query.Email ?? string.Empty,
                    FirstName = query.FirstName ?? string.Empty,
                    LastName = query.LastName ?? string.Empty
                };

                var key = query.Identify();

                try
                {
                    _logger.LogInformation("[WLODZIMIERZ.API / Users] Reading from the cache: {Name} {@Query}",
                        nameof(FilterQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning("[WLODZIMIERZ.API / Users] No entry found for the passed key in the cache");

                    _logger.LogInformation("[WLODZIMIERZ.API / Users] Reading from the database: {Name} {@Query}",
                        nameof(FilterQuery), query);

                    return await ReadFromDatabase(query, model, key);
                }
            }

            // Helpers.

            private async Task<PaginatedList<UserDto>> ReadFromDatabase(FilterQuery query, UserDto model, object key)
            {
                return await _identityService.GetAll()
                    .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                    .Where(await model.FilterAsync())
                    .ProjectToPaginatedListAsync(query.PageNumber, query.PageSize)
                    .Cache(_cache, key);
            }

            private async Task<PaginatedList<UserDto>> ReadFromCache(dynamic key)
            {
                return await _cache.GetAsync<PaginatedList<UserDto>>(key);
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}