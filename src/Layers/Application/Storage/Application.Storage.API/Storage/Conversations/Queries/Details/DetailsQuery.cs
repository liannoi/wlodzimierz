using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Extensions;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Common.Interfaces;
using Application.Storage.API.Storage.Conversations.Extensions;
using Application.Storage.API.Storage.Conversations.Models;
using Application.Storage.API.Storage.Users.Core.Facades;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Conversations.Queries.Details
{
    public class DetailsQuery : IRequest<ConversationDto>, IIdentifier
    {
        public int ConversationId { get; set; }

        public dynamic Identify()
        {
            return new {ConversationId};
        }

        private class Handler : IRequestHandler<DetailsQuery, ConversationDto>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly ILogger<Handler> _logger;
            private readonly IMapper _mapper;
            private readonly IUsersFacade _usersFacade;

            public Handler(IWlodzimierzCachingContext cache, IWlodzimierzContext context, IMapper mapper,
                ILogger<Handler> logger, IUsersFacade usersFacade)
            {
                _cache = cache;
                _context = context;
                _mapper = mapper;
                _logger = logger;
                _usersFacade = usersFacade;
            }

            public async Task<ConversationDto> Handle(DetailsQuery query, CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation("[WLODZIMIERZ.API / Conversations] Reading from the cache: {Name} {@Query}",
                        nameof(DetailsQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning(
                        "[WLODZIMIERZ.API / Conversations] No entry found for the passed key in the cache");

                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / Conversations] Reading from the database: {Name} {@Query}",
                        nameof(DetailsQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            private async Task<ConversationDto> ReadFromDatabase(DetailsQuery query, object key)
            {
                return await _context.Conversations
                    .Where(e => e.ConversationId == query.ConversationId)
                    .ProjectToSingleAsync<ConversationDto>(_mapper.ConfigurationProvider)
                    .MapUsersAsync(_usersFacade)
                    .Cache(_cache, key);
            }

            private async Task<ConversationDto> ReadFromCache(dynamic key)
            {
                return await _cache.GetAsync<ConversationDto>(key);
            }
        }
    }
}