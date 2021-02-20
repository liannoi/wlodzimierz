using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Common.Models;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.Contacts.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Storage.API.Storage.Users.Queries.Contacts
{
    public class ContactsQuery : IRequest<PaginatedList<ContactDto>>
    {
        public string OwnerUserId { get; set; }

        private class Handler : IRequestHandler<ContactsQuery, PaginatedList<ContactDto>>
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

            public async Task<PaginatedList<ContactDto>> Handle(ContactsQuery request,
                CancellationToken cancellationToken)
            {
                try
                {
                    return await ReadFromCache(request);
                }
                catch (NotFoundException)
                {
                    return await ReadFromDatabase(request);
                }
            }

            // Helpers.

            private async Task<PaginatedList<ContactDto>> ReadFromCache(ContactsQuery query)
            {
                var cache = await _cache.GetAsync<PaginatedList<ContactDto>>();
                cache.Restore(query.PageNumber, query.PageSize);

                return cache;
            }

            private async Task<PaginatedList<ContactDto>> ReadFromDatabase(ContactsQuery query)
            {
                var contacts = await _context.Contacts
                    .Where(e => e.OwnerUserId == query.OwnerUserId)
                    .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(query.PageNumber, query.PageSize);

                await _cache.CreateAsync(contacts);

                return contacts;
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}