using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Persistence;
using Application.API.Common.Paging.Extensions;
using Application.API.Common.Paging.Types;
using Application.API.Storage.Contacts.Core.Models;
using Application.API.Storage.Users.Core.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.API.Storage.Contacts.Core.Queries.List
{
    public class ListQuery : IRequest<PaginatedList<CompactContactDto>>
    {
        public UserDto OwnerUser { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        private class Handler : IRequestHandler<ListQuery, PaginatedList<CompactContactDto>>
        {
            private readonly IWlodzimierzContext _context;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<PaginatedList<CompactContactDto>> Handle(ListQuery request,
                CancellationToken cancellationToken)
            {
                return await _context.Contacts
                    .Where(x => x.OwnerUserId == request.OwnerUser.UserId)
                    .OrderBy(x => x.LastName)
                    .ProjectTo<CompactContactDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(request.PageNumber, request.PageSize);
            }
        }
    }
}