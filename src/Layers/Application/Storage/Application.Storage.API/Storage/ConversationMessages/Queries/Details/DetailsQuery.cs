using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.ConversationMessages.Models;
using AutoMapper;
using MediatR;

namespace Application.Storage.API.Storage.ConversationMessages.Queries.Details
{
    public class DetailsQuery : IRequest<ConversationMessageDto>
    {
        public int ConversationMessageId { get; set; }

        private class Handler : IRequestHandler<DetailsQuery, ConversationMessageDto>
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

            public async Task<ConversationMessageDto> Handle(DetailsQuery request, CancellationToken cancellationToken)
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

            private async Task<ConversationMessageDto> ReadFromDatabase(DetailsQuery request)
            {
                var message = await _context.ConversationMessages
                    .Where(e => e.ConversationMessageId == request.ConversationMessageId)
                    .ProjectSingleAsync<ConversationMessageDto>(_mapper.ConfigurationProvider);

                await _cache.CreateAsync(message);

                return message;
            }

            private async Task<ConversationMessageDto> ReadFromCache()
            {
                return await _cache.GetAsync<ConversationMessageDto>();
            }
        }
    }
}