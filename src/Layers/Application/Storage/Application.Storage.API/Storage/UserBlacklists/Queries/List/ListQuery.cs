using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Extensions;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Common.Models;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Common.Interfaces;
using Application.Storage.API.Storage.UserBlacklists.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.UserBlacklists.Queries.List
{
    public class ListQuery : IRequest<PaginatedList<UserBlacklistDto>>, IIdentifier
    {
        public dynamic Identify()
        {
            return new {PageNumber, PageSize};
        }

        private class Handler : IRequestHandler<ListQuery, PaginatedList<UserBlacklistDto>>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly ILogger<Handler> _logger;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzContext context, IWlodzimierzCachingContext cache, IMapper mapper,
                ILogger<Handler> logger)
            {
                _context = context;
                _cache = cache;
                _mapper = mapper;
                _logger = logger;
            }

            public async Task<PaginatedList<UserBlacklistDto>> Handle(ListQuery query,
                CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / User Blacklists] Reading from the cache: {Name} {@Query}",
                        nameof(ListQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning(
                        "[WLODZIMIERZ.API / User Blacklists] No entry found for the passed key in the cache");

                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / User Blacklists] Reading from the database: {Name} {@Query}",
                        nameof(ListQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            private async Task<PaginatedList<UserBlacklistDto>> ReadFromDatabase(ListQuery query, object key)
            {
                return await _context.UserBlacklists
                    .ProjectTo<UserBlacklistDto>(_mapper.ConfigurationProvider)
                    .ProjectToPaginatedListAsync(query.PageNumber, query.PageSize)
                    .Cache(_cache, key);
            }

            private async Task<PaginatedList<UserBlacklistDto>> ReadFromCache(dynamic key)
            {
                return await _cache.GetAsync<PaginatedList<UserBlacklistDto>>(key);
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}