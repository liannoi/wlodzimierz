using System.Linq;
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
using Application.Storage.API.Storage.Contacts.Extensions;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.Users.Facades;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Users.Queries.Contacts
{
    public class ContactsQuery : IRequest<PaginatedList<ContactDto>>, IIdentifier
    {
        public string OwnerUserId { get; set; }

        public dynamic Identify()
        {
            return new {OwnerUserId, PageNumber, PageSize};
        }

        private class Handler : IRequestHandler<ContactsQuery, PaginatedList<ContactDto>>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly ILogger<Handler> _logger;
            private readonly IMapper _mapper;
            private readonly IUsersFacade _usersFacade;

            public Handler(IWlodzimierzContext context, IWlodzimierzCachingContext cache, IMapper mapper,
                ILogger<Handler> logger, IUsersFacade usersFacade)
            {
                _context = context;
                _cache = cache;
                _mapper = mapper;
                _logger = logger;
                _usersFacade = usersFacade;
            }

            public async Task<PaginatedList<ContactDto>> Handle(ContactsQuery query,
                CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation("[WLODZIMIERZ.API / Users] Reading from the cache: {Name} {@Query}",
                        nameof(ContactsQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning("[WLODZIMIERZ.API / Users] No entry found for the passed key in the cache");

                    _logger.LogInformation("[WLODZIMIERZ.API / Users] Reading from the database: {Name} {@Query}",
                        nameof(ContactsQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            // Helpers.

            private async Task<PaginatedList<ContactDto>> ReadFromDatabase(ContactsQuery query, object key)
            {
                return await _context.Contacts
                    .Where(e => e.OwnerUserId == query.OwnerUserId)
                    .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
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