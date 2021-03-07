using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Extensions;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Common.Interfaces;
using Application.Storage.API.Storage.GroupBlacklists.Models;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.GroupBlacklists.Queries.Details
{
    public class DetailsQuery : IRequest<GroupBlacklistDto>, IIdentifier
    {
        public int GroupBlacklistId { get; set; }

        public dynamic Identify()
        {
            return new {GroupBlacklistId};
        }

        private class Handler : IRequestHandler<DetailsQuery, GroupBlacklistDto>
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

            public async Task<GroupBlacklistDto> Handle(DetailsQuery query, CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / Group Blacklists] Reading from the cache: {Name} {@Query}",
                        nameof(DetailsQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning(
                        "[WLODZIMIERZ.API / Group Blacklists] No entry found for the passed key in the cache");

                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / Group Blacklists] Reading from the database: {Name} {@Query}",
                        nameof(DetailsQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            private async Task<GroupBlacklistDto> ReadFromDatabase(DetailsQuery query, object key)
            {
                return await _context.GroupBlacklists
                    .Where(e => e.GroupBlacklistId == query.GroupBlacklistId)
                    .ProjectToSingleAsync<GroupBlacklistDto>(_mapper.ConfigurationProvider)
                    .Cache(_cache, key);
            }

            private async Task<GroupBlacklistDto> ReadFromCache(dynamic key)
            {
                return await _cache.GetAsync<GroupBlacklistDto>(key);
            }
        }
    }
}