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
using Application.Storage.API.Storage.Conversations.Extensions;
using Application.Storage.API.Storage.Conversations.Models;
using Application.Storage.API.Storage.Users.Extensions;
using Application.Storage.API.Storage.Users.Facades;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Users.Queries.Conversations
{
    public class ConversationsQuery : IRequest<PaginatedList<ConversationDto>>, IIdentifier
    {
        public string OwnerUserId { get; set; }

        public dynamic Identify()
        {
            return new {OwnerUserId, PageNumber, PageSize};
        }

        private class Handler : IRequestHandler<ConversationsQuery, PaginatedList<ConversationDto>>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly ILogger<Handler> _logger;
            private readonly IMapper _mapper;
            private readonly IUsersFacade _usersFacade;

            public Handler(IWlodzimierzContext context, IWlodzimierzCachingContext cache, IMapper mapper,
                IUsersFacade usersFacade, ILogger<Handler> logger)
            {
                _context = context;
                _cache = cache;
                _mapper = mapper;
                _usersFacade = usersFacade;
                _logger = logger;
            }

            public async Task<PaginatedList<ConversationDto>> Handle(ConversationsQuery query,
                CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation("[WLODZIMIERZ.API / Users] Reading from the cache: {Name} {@Query}",
                        nameof(ConversationsQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning("[WLODZIMIERZ.API / Users] No entry found for the passed key in the cache");

                    _logger.LogInformation("[WLODZIMIERZ.API / Users] Reading from the database: {Name} {@Query}",
                        nameof(ConversationsQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            // Helpers.

            private async Task<PaginatedList<ConversationDto>> ReadFromDatabase(ConversationsQuery query, object key)
            {
                return await _context.Conversations
                    .Where(e => e.LeftUserId == query.OwnerUserId || e.RightUserId == query.OwnerUserId)
                    .OrderBy(x => x.ConversationId)
                    .ProjectTo<ConversationDto>(_mapper.ConfigurationProvider)
                    .ProjectToPaginatedListAsync(query.PageNumber, query.PageSize)
                    .MapLastMessagesAsync(_context, _mapper)
                    .MapUsersAsync(_usersFacade);
                // .Cache(_cache, key);
            }

            private async Task<PaginatedList<ConversationDto>> ReadFromCache(dynamic key)
            {
                return await _cache.GetAsync<PaginatedList<ConversationDto>>(key);
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}