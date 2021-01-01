using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Core.Exceptions;
using Application.Storage.API.Storage.GroupMessages.Models;
using AutoMapper;
using MediatR;

namespace Application.Storage.API.Storage.GroupMessages.Queries.Details
{
    public class DetailsQuery : IRequest<GroupMessageDto>
    {
        public int GroupMessageId { get; set; }

        private class Handler : IRequestHandler<DetailsQuery, GroupMessageDto>
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

            public async Task<GroupMessageDto> Handle(DetailsQuery request, CancellationToken cancellationToken)
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

            private async Task<GroupMessageDto> ReadFromDatabase(DetailsQuery query)
            {
                var message = await _context.GroupMessages
                    .Where(e => e.GroupMessageId == query.GroupMessageId)
                    .ProjectSingleAsync<GroupMessageDto>(_mapper.ConfigurationProvider);

                await _cache.CreateAsync(message);

                return message;
            }

            private async Task<GroupMessageDto> ReadFromCache()
            {
                return await _cache.GetAsync<GroupMessageDto>();
            }
        }
    }
}