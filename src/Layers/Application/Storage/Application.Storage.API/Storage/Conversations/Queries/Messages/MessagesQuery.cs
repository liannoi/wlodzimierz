using System.Linq;
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
using Application.Storage.API.Storage.ConversationMessages.Extensions;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.Users.Facades;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Conversations.Queries.Messages
{
    public class MessagesQuery : IRequest<PaginatedList<ConversationMessageDto>>, IIdentifier
    {
        public int ConversationId { get; set; }

        public dynamic Identify()
        {
            return new {ConversationId, PageNumber, PageSize};
        }

        private class Handler : IRequestHandler<MessagesQuery, PaginatedList<ConversationMessageDto>>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly ILogger<Handler> _logger;
            private readonly IMapper _mapper;
            private readonly IUsersFacade _usersFacade;

            public Handler(IWlodzimierzCachingContext cache, IWlodzimierzContext context, IMapper mapper,
                IUsersFacade usersFacade, ILogger<Handler> logger)
            {
                _cache = cache;
                _context = context;
                _mapper = mapper;
                _usersFacade = usersFacade;
                _logger = logger;
            }

            public async Task<PaginatedList<ConversationMessageDto>> Handle(MessagesQuery query,
                CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation("[WLODZIMIERZ.API / Conversations] Reading from the cache: {Name} {@Query}",
                        nameof(MessagesQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning(
                        "[WLODZIMIERZ.API / Conversations] No entry found for the passed key in the cache");

                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / Conversations] Reading from the database: {Name} {@Query}",
                        nameof(MessagesQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            private async Task<PaginatedList<ConversationMessageDto>> ReadFromDatabase(MessagesQuery query, object key)
            {
                return await _context.ConversationMessages
                    .Where(e => e.Conversation.ConversationId == query.ConversationId)
                    .OrderByDescending(x => x.Publish)
                    .ProjectTo<ConversationMessageDto>(_mapper.ConfigurationProvider)
                    .ProjectToPaginatedListAsync(query.PageNumber, query.PageSize)
                    .MapUsersAsync(_usersFacade)
                    .Cache(_cache, key);
            }

            private async Task<PaginatedList<ConversationMessageDto>> ReadFromCache(dynamic key)
            {
                return await _cache.GetAsync<PaginatedList<ConversationMessageDto>>(key);
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}