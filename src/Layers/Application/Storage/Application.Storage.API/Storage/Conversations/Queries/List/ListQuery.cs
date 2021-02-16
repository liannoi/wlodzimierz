using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Extensions;
using Application.Paging.API.Models;
using Application.Storage.API.Common.Core.Exceptions;
using Application.Storage.API.Storage.Conversations.Extensions;
using Application.Storage.API.Storage.Conversations.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Storage.API.Storage.Conversations.Queries.List
{
    public class ListQuery : IRequest<PaginatedList<ConversationDto>>
    {
        private class Handler : IRequestHandler<ListQuery, PaginatedList<ConversationDto>>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzContext context, IWlodzimierzCachingContext cache, IMapper mapper)
            {
                _context = context;
                _cache = cache;
                _mapper = mapper;
            }

            public async Task<PaginatedList<ConversationDto>> Handle(ListQuery request,
                CancellationToken cancellationToken)
            {
                try
                {
                    return await ReadFromCache(request);
                }
                catch (NotFoundException)
                {
                    return await ReadFromDatabase(request);
                }
            }

            // Helpers.

            private async Task<PaginatedList<ConversationDto>> ReadFromDatabase(ListQuery query)
            {
                var conversations = await _context.Conversations
                    .ProjectTo<ConversationDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(query.PageNumber, query.PageSize)
                    .ResidualAsync(_context, _mapper);

                await _cache.CreateAsync(conversations);

                return conversations;
            }

            private async Task<PaginatedList<ConversationDto>> ReadFromCache(ListQuery query)
            {
                var cache = await _cache.GetAsync<PaginatedList<ConversationDto>>();
                cache.Restore(query.PageNumber, query.PageSize);

                return cache;
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}