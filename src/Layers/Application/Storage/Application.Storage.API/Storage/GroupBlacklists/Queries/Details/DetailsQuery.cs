using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.GroupBlacklists.Models;
using AutoMapper;
using MediatR;

namespace Application.Storage.API.Storage.GroupBlacklists.Queries.Details
{
    public class DetailsQuery : IRequest<GroupBlacklistDto>
    {
        public int GroupBlacklistId { get; set; }

        private class Handler : IRequestHandler<DetailsQuery, GroupBlacklistDto>
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

            public async Task<GroupBlacklistDto> Handle(DetailsQuery request, CancellationToken cancellationToken)
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

            private async Task<GroupBlacklistDto> ReadFromDatabase(DetailsQuery query)
            {
                var groupBlacklist = await _context.GroupBlacklists
                    .Where(e => e.GroupBlacklistId == query.GroupBlacklistId)
                    .ProjectSingleAsync<GroupBlacklistDto>(_mapper.ConfigurationProvider);

                await _cache.CreateAsync(groupBlacklist);

                return groupBlacklist;
            }

            private async Task<GroupBlacklistDto> ReadFromCache()
            {
                return await _cache.GetAsync<GroupBlacklistDto>();
            }
        }
    }
}