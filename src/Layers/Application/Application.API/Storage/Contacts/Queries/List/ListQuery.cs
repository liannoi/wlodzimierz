using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Core.Exceptions;
using Application.API.Common.Infrastructure.Caching;
using Application.API.Common.Infrastructure.Persistence;
using Application.API.Common.Paging;
using Application.API.Storage.Contacts.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.API.Storage.Contacts.Queries.List
{
    public class ListQuery : IRequest<PaginatedList<ContactDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        private class Handler : IRequestHandler<ListQuery, PaginatedList<ContactDto>>
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

            public async Task<PaginatedList<ContactDto>> Handle(ListQuery request, CancellationToken cancellationToken)
            {
                try
                {
                    return await _cache.GetAsync<PaginatedList<ContactDto>>();
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
    }
}