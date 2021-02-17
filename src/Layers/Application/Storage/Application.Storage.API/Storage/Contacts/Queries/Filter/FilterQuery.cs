using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Filtration.API.Extensions;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Common.Extensions;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.Contacts.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Storage.API.Storage.Contacts.Queries.Filter
{
    public class FilterQuery : IRequest<PaginatedList<ContactDto>>
    {
        public int? ContactId { get; set; }
        public string OwnerUserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }

        private class Handler : IRequestHandler<FilterQuery, PaginatedList<ContactDto>>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzContext context, IMapper mapper, IWlodzimierzCachingContext cache)
            {
                _context = context;
                _mapper = mapper;
                _cache = cache;
            }

            public async Task<PaginatedList<ContactDto>> Handle(FilterQuery request,
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

            private async Task<PaginatedList<ContactDto>> ReadFromDatabase(FilterQuery query)
            {
                var model = new ContactDto
                {
                    ContactId = query.ContactId ?? 0,
                    OwnerUserId = query.OwnerUserId,
                    FirstName = query.FirstName ?? string.Empty,
                    LastName = query.LastName ?? string.Empty,
                    Email = query.Email ?? string.Empty
                };

                var contacts = await _context.Contacts
                    .Where(e => e.OwnerUserId == query.OwnerUserId)
                    .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
                    .Where(await model.FilterAsync())
                    .PaginatedListAsync(query.PageNumber, query.PageSize);

                await _cache.CreateAsync(contacts);

                return contacts;
            }

            private async Task<PaginatedList<ContactDto>> ReadFromCache(FilterQuery request)
            {
                var cache = await _cache.GetAsync<PaginatedList<ContactDto>>();
                cache.Restore(request.PageNumber, request.PageSize);

                return cache;
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}