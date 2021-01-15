using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Extensions;
using Application.Paging.API.Models;
using Application.Storage.API.Common.Core.Exceptions;
using Application.Storage.API.Storage.ConversationMessages.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Storage.API.Storage.Conversations.Queries.Messages
{
    public class MessagesQuery : IRequest<PaginatedList<ConversationMessageDto>>
    {
        public int ConversationId { get; set; }

        private class Handler : IRequestHandler<MessagesQuery, PaginatedList<ConversationMessageDto>>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzCachingContext cache, IWlodzimierzContext context, IMapper mapper)
            {
                _cache = cache;
                _context = context;
                _mapper = mapper;
            }

            public async Task<PaginatedList<ConversationMessageDto>> Handle(MessagesQuery request,
                CancellationToken cancellationToken)
            {
                try
                {
                    return await ReadFromCache();
                }
                catch (NotFoundException)
                {
                    return await ReadFromDatabase(request);
                }
            }

            private async Task<PaginatedList<ConversationMessageDto>> ReadFromDatabase(MessagesQuery query)
            {
                var conversations = await _context.ConversationMessages
                    .Where(e => e.Conversation.ConversationId == query.ConversationId)
                    .OrderBy(x => x.Publish)
                    .ProjectTo<ConversationMessageDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(query.PageNumber, query.PageSize);

                await _cache.CreateAsync<PaginatedList<ConversationMessageDto>, ConversationMessageDto>(conversations);

                return conversations;
            }

            private async Task<PaginatedList<ConversationMessageDto>> ReadFromCache()
            {
                return await _cache.GetAsync<PaginatedList<ConversationMessageDto>, ConversationMessageDto>();
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}