using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Persistence;
using Application.API.Common.Paging.Extensions;
using Application.API.Common.Paging.Types;
using Application.API.Storage.Users.Contacts.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.API.Storage.Users.Contacts.Queries.List
{
    public class ListQuery : IRequest<PaginatedList<ContactDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        private class Handler : IRequestHandler<ListQuery, PaginatedList<ContactDto>>
        {
            private readonly IWlodzimierzContext _context;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<PaginatedList<ContactDto>> Handle(ListQuery request, CancellationToken cancellationToken)
            {
                return await _context.Contacts
                    .OrderBy(x => x.LastName)
                    .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(request.PageNumber, request.PageSize);
            }
        }
    }
}