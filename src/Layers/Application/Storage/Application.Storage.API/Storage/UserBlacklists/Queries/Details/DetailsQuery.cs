using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.UserBlacklists.Models;
using AutoMapper;
using MediatR;

namespace Application.Storage.API.Storage.UserBlacklists.Queries.Details
{
    public class DetailsQuery : IRequest<UserBlacklistDto>
    {
        public int UserBlacklistId { get; set; }

        private class Handler : IRequestHandler<DetailsQuery, UserBlacklistDto>
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

            public async Task<UserBlacklistDto> Handle(DetailsQuery request, CancellationToken cancellationToken)
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

            private async Task<UserBlacklistDto> ReadFromDatabase(DetailsQuery query)
            {
                var contact = await _context.UserBlacklists
                    .Where(e => e.UserBlacklistId == query.UserBlacklistId)
                    .ProjectSingleAsync<UserBlacklistDto>(_mapper.ConfigurationProvider);

                await _cache.CreateAsync(contact);

                return contact;
            }

            private async Task<UserBlacklistDto> ReadFromCache()
            {
                return await _cache.GetAsync<UserBlacklistDto>();
            }
        }
    }
}