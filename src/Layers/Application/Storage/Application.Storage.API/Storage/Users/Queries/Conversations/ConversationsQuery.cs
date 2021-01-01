using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Extensions;
using Application.Paging.API.Models;
using Application.Storage.API.Common.Core.Exceptions;
using Application.Storage.API.Storage.Conversations.Models;
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

            public Handler(IWlodzimierzContext context, IWlodzimierzCachingContext cache, IMapper mapper)
            {
                _context = context;
                _cache = cache;
                _mapper = mapper;
            }

            public async Task<PaginatedList<ConversationDto>> Handle(ConversationsQuery request,
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

            private async Task<PaginatedList<ConversationDto>> ReadFromCache(ConversationsQuery query)
            {
                var cache = await _cache.GetAsync<PaginatedList<ConversationDto>>();
                cache.Restore(query.PageNumber, query.PageSize);

                return cache;
            }

            private async Task<PaginatedList<ConversationDto>> ReadFromDatabase(ConversationsQuery query)
            {
                var contacts = await _context.Conversations
                    .Where(e => e.LeftUserId == query.OwnerUserId || e.RightUserId == query.OwnerUserId)
                    .ProjectTo<ConversationDto>(_mapper.ConfigurationProvider)
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