using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.GroupAdministrators.Models;
using AutoMapper;
using MediatR;

namespace Application.Storage.API.Storage.GroupAdministrators.Queries.Details
{
    public class DetailsQuery : IRequest<GroupAdministratorDto>
    {
        public int GroupAdministratorId { get; set; }

        private class Handler : IRequestHandler<DetailsQuery, GroupAdministratorDto>
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

            public async Task<GroupAdministratorDto> Handle(DetailsQuery request, CancellationToken cancellationToken)
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

            private async Task<GroupAdministratorDto> ReadFromDatabase(DetailsQuery query)
            {
                var groupAdministrator = await _context.GroupAdministrators
                    .Where(e => e.GroupAdministratorId == query.GroupAdministratorId)
                    .ProjectSingleAsync<GroupAdministratorDto>(_mapper.ConfigurationProvider);

                await _cache.CreateAsync(groupAdministrator);

                return groupAdministrator;
            }

            private async Task<GroupAdministratorDto> ReadFromCache()
            {
                return await _cache.GetAsync<GroupAdministratorDto>();
            }
        }
    }
}