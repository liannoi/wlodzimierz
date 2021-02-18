using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Common.Models;
using Application.Paging.API.Extensions;
using Application.Storage.API.Storage.Conversations.Models;
using Application.Storage.API.Storage.Users.Extensions;
using Application.Storage.API.Storage.Users.Facades;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Storage.API.Storage.Users.Queries.Conversations
{
    public class ConversationsQuery : IRequest<PaginatedList<ConversationDto>>
    {
        public string OwnerUserId { get; set; }

        private class Handler : IRequestHandler<ConversationsQuery, PaginatedList<ConversationDto>>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly IMapper _mapper;
            private readonly IUsersFacade _usersFacade;

            public Handler(IWlodzimierzContext context, IWlodzimierzCachingContext cache, IMapper mapper,
                IUsersFacade usersFacade)
            {
                _context = context;
                _cache = cache;
                _mapper = mapper;
                _usersFacade = usersFacade;
            }

            public async Task<PaginatedList<ConversationDto>> Handle(ConversationsQuery request,
                CancellationToken cancellationToken)
            {
                return await ReadFromDatabase(request);

#if CACHE
                try
                {
                    return await ReadFromCache();
                }
                catch (NotFoundException)
                {
                    return await ReadFromDatabase(request);
                }
#endif
            }

            // Helpers.

            private async Task<PaginatedList<ConversationDto>> ReadFromDatabase(ConversationsQuery query)
            {
                var conversations = await _context.Conversations
                    .Where(e => e.LeftUserId == query.OwnerUserId || e.RightUserId == query.OwnerUserId)
                    .OrderBy(x => x.ConversationId)
                    .ProjectTo<ConversationDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(query.PageNumber, query.PageSize)
                    .MapMessageAsync(_context, _mapper);

                await _usersFacade.MapAsync(conversations);
                await _cache.CreateAsync(conversations);

                return conversations;
            }

            private async Task<PaginatedList<ConversationDto>> ReadFromCache()
            {
                return await _cache.GetAsync<PaginatedList<ConversationDto>>();
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}