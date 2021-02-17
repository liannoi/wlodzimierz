using System.Linq;
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

namespace Application.Storage.API.Storage.Users.Queries.ConversationMessages
{
    public class ConversationMessagesQuery : IRequest<PaginatedList<ConversationMessageDto>>
    {
        public string OwnerUserId { get; set; }

        private class Handler : IRequestHandler<ConversationMessagesQuery, PaginatedList<ConversationMessageDto>>
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

            public async Task<PaginatedList<ConversationMessageDto>> Handle(ConversationMessagesQuery request,
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

            private async Task<PaginatedList<ConversationMessageDto>> ReadFromCache(ConversationMessagesQuery query)
            {
                var cache = await _cache.GetAsync<PaginatedList<ConversationMessageDto>>();
                cache.Restore(query.PageNumber, query.PageSize);

                return cache;
            }

            private async Task<PaginatedList<ConversationMessageDto>> ReadFromDatabase(ConversationMessagesQuery query)
            {
                var contacts = await _context.ConversationMessages
                    .Where(e => e.OwnerUserId == query.OwnerUserId)
                    .ProjectTo<ConversationMessageDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(query.PageNumber, query.PageSize);

                await _cache.CreateAsync(contacts);

                return contacts;
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}