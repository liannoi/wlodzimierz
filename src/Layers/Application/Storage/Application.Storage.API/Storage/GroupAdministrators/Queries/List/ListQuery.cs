using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Extensions;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Common.Models;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Common.Interfaces;
using Application.Storage.API.Storage.GroupAdministrators.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.GroupAdministrators.Queries.List
{
    public class ListQuery : IRequest<PaginatedList<GroupAdministratorDto>>, IIdentifier
    {
        public dynamic Identify()
        {
            return new {PageNumber, PageSize};
        }

        private class Handler : IRequestHandler<ListQuery, PaginatedList<GroupAdministratorDto>>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly ILogger<Handler> _logger;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzContext context, IWlodzimierzCachingContext cache, IMapper mapper,
                ILogger<Handler> logger)
            {
                _context = context;
                _cache = cache;
                _mapper = mapper;
                _logger = logger;
            }

            public async Task<PaginatedList<GroupAdministratorDto>> Handle(ListQuery query,
                CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / Group Administrators] Reading from the cache: {Name} {@Query}",
                        nameof(ListQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning(
                        "[WLODZIMIERZ.API / Group Administrators] No entry found for the passed key in the cache");

                    _logger.LogInformation(
                        "[WLODZIMIERZ.API / Group Administrators] Reading from the database: {Name} {@Query}",
                        nameof(ListQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            private async Task<PaginatedList<GroupAdministratorDto>> ReadFromDatabase(ListQuery query, object key)
            {
                return await _context.GroupAdministrators
                    .ProjectTo<GroupAdministratorDto>(_mapper.ConfigurationProvider)
                    .ProjectToPaginatedListAsync(query.PageNumber, query.PageSize)
                    .Cache(_cache, key);
            }

            private async Task<PaginatedList<GroupAdministratorDto>> ReadFromCache(dynamic key)
            {
                return await _cache.GetAsync<PaginatedList<GroupAdministratorDto>>(key);
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}