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
using Application.Storage.API.Storage.Contacts.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Contacts.Queries.List
{
    public class ListQuery : IRequest<PaginatedList<ContactDto>>, IIdentifier
    {
        public dynamic Identify()
        {
            return new {PageNumber, PageSize};
        }

        private class Handler : IRequestHandler<ListQuery, PaginatedList<ContactDto>>
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

            public async Task<PaginatedList<ContactDto>> Handle(ListQuery query, CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation("[WLODZIMIERZ.API / Contacts] Reading from the cache: {Name} {@Query}",
                        nameof(ListQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning("[WLODZIMIERZ.API / Contacts] No entry found for the passed key in the cache");

                    _logger.LogInformation("[WLODZIMIERZ.API / Contacts] Reading from the database: {Name} {@Query}",
                        nameof(ListQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            // Helpers.

            private async Task<PaginatedList<ContactDto>> ReadFromDatabase(ListQuery query, object key)
            {
                return await _context.Contacts
                    .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
                    .ProjectToPaginatedListAsync(query.PageNumber, query.PageSize)
                    .Cache(_cache, key);
            }

            private async Task<PaginatedList<ContactDto>> ReadFromCache(dynamic key)
            {
                return await _cache.GetAsync<PaginatedList<ContactDto>>(key);
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}