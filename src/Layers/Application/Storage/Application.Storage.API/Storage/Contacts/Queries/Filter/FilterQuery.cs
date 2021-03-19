using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Filtration.API.Extensions;
using Application.Infrastructure.Caching.API.Extensions;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Common.Models;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Common.Interfaces;
using Application.Storage.API.Storage.Contacts.Extensions;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.Users.Core.Facades;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Contacts.Queries.Filter
{
    public class FilterQuery : IRequest<PaginatedList<ContactDto>>, IIdentifier
    {
        public string OwnerUserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }

        public dynamic Identify()
        {
            return new {OwnerUserId, FirstName, LastName, Email, PageNumber, PageSize};
        }

        private class Handler : IRequestHandler<FilterQuery, PaginatedList<ContactDto>>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly ILogger<Handler> _logger;
            private readonly IMapper _mapper;
            private readonly IUsersFacade _usersFacade;

            public Handler(IWlodzimierzContext context, IMapper mapper, IWlodzimierzCachingContext cache,
                ILogger<Handler> logger, IUsersFacade usersFacade)
            {
                _context = context;
                _mapper = mapper;
                _cache = cache;
                _logger = logger;
                _usersFacade = usersFacade;
            }

            public async Task<PaginatedList<ContactDto>> Handle(FilterQuery query, CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation("[WLODZIMIERZ.API / Contacts] Reading from the cache: {Name} {@Query}",
                        nameof(FilterQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning("[WLODZIMIERZ.API / Contacts] No entry found for the passed key in the cache");

                    _logger.LogInformation("[WLODZIMIERZ.API / Contacts] Reading from the database: {Name} {@Query}",
                        nameof(FilterQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            // Helpers.

            private async Task<PaginatedList<ContactDto>> ReadFromDatabase(FilterQuery query, object key)
            {
                var model = new ContactDto
                {
                    OwnerUserId = query.OwnerUserId,
                    FirstName = query.FirstName ?? string.Empty,
                    LastName = query.LastName ?? string.Empty,
                    Email = query.Email ?? string.Empty
                };

                return await _context.Contacts
                    .Where(e => e.OwnerUserId == query.OwnerUserId)
                    .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
                    .Where(await model.FilterAsync())
                    .ProjectToPaginatedListAsync(query.PageNumber, query.PageSize)
                    .MapUsersAsync(_usersFacade)
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