using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Extensions;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Common.Interfaces;
using Application.Storage.API.Storage.ConversationMessages.Extensions;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.Users.Facades;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.ConversationMessages.Queries.Details
{
    public class DetailsQuery : IRequest<ConversationMessageDto>, IIdentifier
    {
        public int ConversationMessageId { get; set; }

        public dynamic Identify()
        {
            return new {ConversationMessageId};
        }

        private class Handler : IRequestHandler<DetailsQuery, ConversationMessageDto>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly ILogger<Handler> _logger;
            private readonly IMapper _mapper;
            private readonly IUsersFacade _usersFacade;

            public Handler(IWlodzimierzContext context, IWlodzimierzCachingContext cache, IMapper mapper,
                ILogger<Handler> logger, IUsersFacade usersFacade)
            {
                _context = context;
                _cache = cache;
                _mapper = mapper;
                _logger = logger;
                _usersFacade = usersFacade;
            }

            public async Task<ConversationMessageDto> Handle(DetailsQuery query, CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / Conversation Messages] Reading from the cache: {Name} {@Query}",
                        nameof(DetailsQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning(
                        "[WLODZIMIERZ.API / Conversation Messages] No entry found for the passed key in the cache");

                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / Conversation Messages] Reading from the database: {Name} {@Query}",
                        nameof(DetailsQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            private async Task<ConversationMessageDto> ReadFromDatabase(DetailsQuery query, object key)
            {
                return await _context.ConversationMessages
                    .Where(e => e.ConversationMessageId == query.ConversationMessageId)
                    .ProjectToSingleAsync<ConversationMessageDto>(_mapper.ConfigurationProvider)
                    .MapUsersAsync(_usersFacade)
                    .Cache(_cache, key);
            }

            private async Task<ConversationMessageDto> ReadFromCache(dynamic key)
            {
                return await _cache.GetAsync<ConversationMessageDto>(key);
            }
        }
    }
}