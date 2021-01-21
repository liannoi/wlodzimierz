using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Identity.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Extensions;
using Application.Paging.API.Models;
using Application.Storage.API.Common.Core.Exceptions;
using Application.Storage.API.Storage.Conversations.Models;
using Application.Storage.API.Storage.Users.Models;
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
            private readonly IIdentityService _identityService;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzContext context, IWlodzimierzCachingContext cache, IMapper mapper,
                IIdentityService identityService)
            {
                _context = context;
                _cache = cache;
                _mapper = mapper;
                _identityService = identityService;
            }

            public async Task<PaginatedList<ConversationDto>> Handle(ConversationsQuery request,
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

            // Helpers.

            private async Task<PaginatedList<ConversationDto>> ReadFromDatabase(ConversationsQuery query)
            {
                var contacts = await _context.Conversations
                    .Where(e => e.LeftUserId == query.OwnerUserId || e.RightUserId == query.OwnerUserId)
                    .OrderBy(x => x.ConversationId)
                    .ProjectTo<ConversationDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(query.PageNumber, query.PageSize);

                foreach (var conversation in contacts.Items)
                {
                    conversation.LeftUser =
                        _mapper.Map<UserDto>(await _identityService.FindByIdAsync(conversation.LeftUserId));

                    conversation.RightUser =
                        _mapper.Map<UserDto>(await _identityService.FindByIdAsync(conversation.RightUserId));
                }

                await _cache.CreateAsync(contacts);

                return contacts;
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