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
using Application.Storage.API.Storage.Users.Core.Facades;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.ConversationMessages.Queries.List
{
    public class ListQuery : IRequest<PaginatedList<ConversationMessageDto>>, IIdentifier
    {
        public dynamic Identify()
        {
            return new {PageNumber, PageSize};
        }

        private class Handler : IRequestHandler<ListQuery, PaginatedList<ConversationMessageDto>>
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

            public async Task<PaginatedList<ConversationMessageDto>> Handle(ListQuery query,
                CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / Conversation Messages] Reading from the cache: {Name} {@Query}",
                        nameof(ListQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning(
                        "[WLODZIMIERZ.API / Conversation Messages] No entry found for the passed key in the cache");

                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / Conversation Messages] Reading from the database: {Name} {@Query}",
                        nameof(ListQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            private async Task<PaginatedList<ConversationMessageDto>> ReadFromDatabase(ListQuery query, object key)
            {
                return await _context.ConversationMessages
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