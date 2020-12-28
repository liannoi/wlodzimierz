using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Extensions;
using Application.Paging.API.Models;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.Users.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Storage.API.Storage.Users.Queries.Contacts
{
    public class ContactsQuery : IRequest<PaginatedList<ContactDto>>
    {
        public UserDto OwnerUser { get; set; }

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
                return await _context.Contacts
                    .Where(e => e.OwnerUserId == request.OwnerUser.UserId)
                    .OrderBy(e => e.LastName)
                    .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(request.PageNumber, request.PageSize);
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}