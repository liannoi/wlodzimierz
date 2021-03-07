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
using Application.Storage.API.Storage.ConversationMessages.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Users.Queries.ConversationMessages
{
    public class ConversationMessagesQuery : IRequest<PaginatedList<ConversationMessageDto>>, IIdentifier
    {
        public string OwnerUserId { get; set; }

        public dynamic Identify()
        {
            return new {OwnerUserId, PageNumber, PageSize};
        }

        private class Handler : IRequestHandler<ConversationMessagesQuery, PaginatedList<ConversationMessageDto>>
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

            public async Task<PaginatedList<ConversationMessageDto>> Handle(ConversationMessagesQuery query,
                CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation("[WLODZIMIERZ.API / Users] Reading from the cache: {Name} {@Query}",
                        nameof(ConversationMessagesQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning("[WLODZIMIERZ.API / Users] No entry found for the passed key in the cache");

                    _logger.LogInformation("[WLODZIMIERZ.API / Users] Reading from the database: {Name} {@Query}",
                        nameof(ConversationMessagesQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            // Helpers.

            private async Task<PaginatedList<ConversationMessageDto>> ReadFromDatabase(ConversationMessagesQuery query,
                object key)
            {
                return await _context.ConversationMessages
                    .Where(e => e.OwnerUserId == query.OwnerUserId)
                    .ProjectTo<ConversationMessageDto>(_mapper.ConfigurationProvider)
                    .ProjectToPaginatedListAsync(query.PageNumber, query.PageSize)
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