using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Extensions;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Common.Interfaces;
using Application.Storage.API.Storage.GroupAdministrators.Models;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.GroupAdministrators.Queries.Details
{
    public class DetailsQuery : IRequest<GroupAdministratorDto>, IIdentifier
    {
        public int GroupAdministratorId { get; set; }

        public dynamic Identify()
        {
            return new {GroupAdministratorId};
        }

        private class Handler : IRequestHandler<DetailsQuery, GroupAdministratorDto>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly ILogger<Handler> _logger;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzCachingContext cache, IWlodzimierzContext context, IMapper mapper,
                ILogger<Handler> logger)
            {
                _cache = cache;
                _context = context;
                _mapper = mapper;
                _logger = logger;
            }

            public async Task<GroupAdministratorDto> Handle(DetailsQuery query, CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / Group Administrators] Reading from the cache: {Name} {@Query}",
                        nameof(DetailsQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning(
                        "[WLODZIMIERZ.API / Group Administrators] No entry found for the passed key in the cache");

                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / Group Administrators] Reading from the database: {Name} {@Query}",
                        nameof(DetailsQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            private async Task<GroupAdministratorDto> ReadFromDatabase(DetailsQuery query, object key)
            {
                return await _context.GroupAdministrators
                    .Where(e => e.GroupAdministratorId == query.GroupAdministratorId)
                    .ProjectToSingleAsync<GroupAdministratorDto>(_mapper.ConfigurationProvider)
                    .Cache(_cache, key);
            }

            private async Task<GroupAdministratorDto> ReadFromCache(dynamic key)
            {
                return await _cache.GetAsync<GroupAdministratorDto>(key);
            }
        }
    }
}