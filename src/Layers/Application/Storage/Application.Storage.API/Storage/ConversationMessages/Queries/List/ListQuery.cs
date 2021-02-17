using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Common.Extensions;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.ConversationMessages.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Storage.API.Storage.ConversationMessages.Queries.List
{
    public class ListQuery : IRequest<PaginatedList<ConversationMessageDto>>
    {
        private class Handler : IRequestHandler<ListQuery, PaginatedList<ConversationMessageDto>>
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

            public async Task<PaginatedList<ConversationMessageDto>> Handle(ListQuery request,
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

            private async Task<PaginatedList<ConversationMessageDto>> ReadFromDatabase(ListQuery request)
            {
                var conversations = await _context.ConversationMessages
                    .ProjectTo<ConversationMessageDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(request.PageNumber, request.PageSize);

                await _cache.CreateAsync(conversations);

                return conversations;
            }

            private async Task<PaginatedList<ConversationMessageDto>> ReadFromCache(ListQuery request)
            {
                var cache = await _cache.GetAsync<PaginatedList<ConversationMessageDto>>();
                cache.Restore(request.PageNumber, request.PageSize);

                return cache;
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}