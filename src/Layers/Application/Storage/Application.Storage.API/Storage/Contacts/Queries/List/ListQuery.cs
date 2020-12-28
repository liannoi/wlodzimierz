using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Extensions;
using Application.Paging.API.Models;
using Application.Storage.API.Common.Core.Exceptions;
using Application.Storage.API.Storage.Contacts.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Storage.API.Storage.Contacts.Queries.List
{
    public class ListQuery : IRequest<PaginatedList<ContactDto>>
    {
        private class Handler : IRequestHandler<ListQuery, PaginatedList<ContactDto>>
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

            public async Task<PaginatedList<ContactDto>> Handle(ListQuery request, CancellationToken cancellationToken)
            {
                try
                {
                    var cache = await _cache.GetAsync<PaginatedList<ContactDto>>();
                    cache.Restore(request.PageNumber, request.PageSize);

                    return cache;
                }
                catch (NotFoundException)
                {
                    var contacts = await _context.Contacts
                        .OrderBy(x => x.LastName)
                        .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
                        .PaginatedListAsync(request.PageNumber, request.PageSize);

                    await _cache.CreateAsync(contacts);

                    return contacts;
                }
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}