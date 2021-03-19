using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Extensions;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Common.Interfaces;
using Application.Storage.API.Storage.Contacts.Extensions;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.Users.Core.Facades;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Storage.API.Storage.Contacts.Queries.Details
{
    public class DetailsQuery : IRequest<ContactDto>, IIdentifier
    {
        public int ContactId { get; set; }

        public dynamic Identify()
        {
            return new {ContactId};
        }

        private class Handler : IRequestHandler<DetailsQuery, ContactDto>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly ILogger<Handler> _logger;
            private readonly IMapper _mapper;
            private readonly IUsersFacade _usersFacade;

            public Handler(IWlodzimierzCachingContext cache, IWlodzimierzContext context, IMapper mapper,
                ILogger<Handler> logger, IUsersFacade usersFacade)
            {
                _cache = cache;
                _context = context;
                _mapper = mapper;
                _logger = logger;
                _usersFacade = usersFacade;
            }

            public async Task<ContactDto> Handle(DetailsQuery query, CancellationToken cancellationToken)
            {
                var key = query.Identify();

                try
                {
                    _logger.LogInformation("[WLODZIMIERZ.API / Contacts] Reading from the cache: {Name} {@Query}",
                        nameof(DetailsQuery), query);

                    return await ReadFromCache(key);
                }
                catch (NotFoundException)
                {
                    _logger.LogWarning("[WLODZIMIERZ.API / Contacts] No entry found for the passed key in the cache");

                    _logger.LogInformation("[WLODZIMIERZ.API / Contacts] Reading from the database: {Name} {@Query}",
                        nameof(DetailsQuery), query);

                    return await ReadFromDatabase(query, key);
                }
            }

            // Helpers.

            private async Task<ContactDto> ReadFromDatabase(DetailsQuery query, object key)
            {
                return await _context.Contacts
                    .Where(e => e.ContactId == query.ContactId)
                    .ProjectToSingleAsync<ContactDto>(_mapper.ConfigurationProvider)
                    .MapUsersAsync(_usersFacade)
                    .Cache(_cache, key);
            }

            private async Task<ContactDto> ReadFromCache(dynamic key)
            {
                return await _cache.GetAsync<ContactDto>(key);
            }
        }
    }
}