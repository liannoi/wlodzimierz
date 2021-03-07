using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Extensions;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Common.Interfaces;
using Application.Storage.API.Storage.GroupMessages.Models;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.GroupMessages.Queries.Details
{
    public class DetailsQuery : IRequest<GroupMessageDto>, IIdentifier
    {
        public int GroupMessageId { get; set; }

        public dynamic Identify()
        {
            return new {GroupMessageId};
        }

        private class Handler : IRequestHandler<DetailsQuery, GroupMessageDto>
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

            public async Task<GroupMessageDto> Handle(DetailsQuery query, CancellationToken cancellationToken)
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

            private async Task<GroupMessageDto> ReadFromDatabase(DetailsQuery query, object key)
            {
                return await _context.GroupMessages
                    .Where(e => e.GroupMessageId == query.GroupMessageId)
                    .ProjectToSingleAsync<GroupMessageDto>(_mapper.ConfigurationProvider)
                    .Cache(_cache, key);
            }

            private async Task<GroupMessageDto> ReadFromCache(dynamic key)
            {
                return await _cache.GetAsync<GroupMessageDto>(key);
            }
        }
    }
}