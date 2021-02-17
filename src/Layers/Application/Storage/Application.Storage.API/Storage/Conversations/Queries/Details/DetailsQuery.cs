using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Common.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.Conversations.Models;
using AutoMapper;
using MediatR;

namespace Application.Storage.API.Storage.Conversations.Queries.Details
{
    public class DetailsQuery : IRequest<ConversationDto>
    {
        public int ConversationId { get; set; }

        private class Handler : IRequestHandler<DetailsQuery, ConversationDto>
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

            public async Task<ConversationDto> Handle(DetailsQuery request, CancellationToken cancellationToken)
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

            private async Task<ConversationDto> ReadFromDatabase(DetailsQuery request)
            {
                var conversation = await _context.Conversations
                    .Where(e => e.ConversationId == request.ConversationId)
                    .ProjectSingleAsync<ConversationDto>(_mapper.ConfigurationProvider);

                await _cache.CreateAsync(conversation);

                return conversation;
            }

            private async Task<ConversationDto> ReadFromCache()
            {
                return await _cache.GetAsync<ConversationDto>();
            }
        }
    }
}