using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Common.Models;
using Application.Paging.API.Extensions;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.Users.Facades;
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
            private readonly IUsersFacade _usersFacade;

            public Handler(IWlodzimierzCachingContext cache, IWlodzimierzContext context, IMapper mapper,
                IUsersFacade usersFacade)
            {
                _cache = cache;
                _context = context;
                _mapper = mapper;
                _usersFacade = usersFacade;
            }

            public async Task<PaginatedList<ConversationMessageDto>> Handle(MessagesQuery request,
                CancellationToken cancellationToken)
            {
                return await ReadFromDatabase(request);
            }

            private async Task<PaginatedList<ConversationMessageDto>> ReadFromDatabase(MessagesQuery query)
            {
                var messages = await _context.ConversationMessages
                    .Where(e => e.Conversation.ConversationId == query.ConversationId)
                    .OrderByDescending(x => x.Publish)
                    .ProjectTo<ConversationMessageDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(query.PageNumber, query.PageSize);

                await _usersFacade.MapAsync(messages);

                return messages;
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}